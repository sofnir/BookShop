import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BookService } from 'src/app/shared/services/book.service';
import { Book } from 'src/app/shared/models/book';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private firestore: AngularFirestore, private bookService: BookService) { }

  firestoreCollection = this.firestore.collection('shopping-cart');

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.firestore.doc('shopping-carts/' + cartId).get().pipe(
      switchMap(cart => {
        const cartData = cart.data() as ShoppingCart;
        return this.firestore.collection('shopping-carts/' + cartId + '/items').snapshotChanges().pipe(
          map(items => {
            const mappedItems = items.map(item => {
              const itemDoc = item.payload.doc;
              const id = itemDoc.id;
              const data = itemDoc.data() as any;
              const book = <Book>{
                id: id,
                title: data.title,
                author: data.author,
                price: data.price,
                category: data.category,
                imageUrl: data.imageUrl
              }              
              const product = new Product(id, book, data.quantity);
              return product;
            });
            const shoppingCart = new ShoppingCart(cartId, cartData.createdDate, mappedItems);
            return shoppingCart;
          })
        )
      })
    )
  }

  addToCart(book: Book) {
    this.updateItem(book, 1);
  }

  removeFromCart(book: Book) {
    this.updateItem(book, -1);
  }

  async clearCart(cart: ShoppingCart) {
    if(!cart || !cart.products) return;
    cart?.products.forEach(product => {
      if (!cart?.id || !product.id) return;
      this.removeItem(cart.id, product.id);
    });    
  }

  private create() {
    return this.firestore.collection('shopping-carts').add({
      createdDate: new Date()      
    });
  }

  private getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) {
      return Promise.resolve(cartId);
    }
    return this.create()
      .then(docRef => {
        localStorage.setItem('cartId', docRef.id);        
        return docRef.id;
      });
  }

  public removeItem(cartId: string, bookId: string) {
    this.firestore.doc('shopping-carts/' + cartId + '/items/' + bookId).delete();
  }

  private updateItem(book: Book, change: number) {
    this.getOrCreateCartId()
      .then(cartId => {
        let items$ = this.firestore.doc('shopping-carts/' + cartId + '/items/' + book.id);
        items$.get().subscribe(item => {          
          let quantity = ((item.data() as Product)?.quantity || 0) + change;
          if (quantity === 0 && book.id) {
            this.removeItem(cartId, book.id);
          } else {
            items$.set({
              title: book.title,
              author: book.author,
              price: book.price,
              category: book.category,
              imageUrl: book.imageUrl,
              quantity: quantity
            });
          }          
        });        
      });
  }
}