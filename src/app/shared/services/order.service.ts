import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { Shipping } from '../models/shipping';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: AngularFirestore) { }
  
  async createOrder(userId: string, shipping: Shipping, products: Product[]) {
    const id = await this.createCollection();    
    const orderProducts = products.map((product: Product) => {
      return {
        quantity: product.quantity,
        title: product.book?.title,
        author: product.book?.author,
        category: product.book?.category,
        imageUrl: product.book?.imageUrl,
        price: product.book?.price
      }
    });
    this.firestore.doc('orders/' + id).set({
      userId: userId,
      createdDate: Date(),
      products: orderProducts,
      shipping: shipping      
    });
  }

  private async createCollection(): Promise<string> {
    let docRef = await this.firestore.collection('orders').add({
      createdDate: new Date()
    });
    return docRef.id;
  }

  getOrders() {
    return this.firestore.collection('orders').snapshotChanges().pipe(
      map(orders => {        
        return orders.map(order => {
          const orderDoc = order.payload.doc;
          const id = orderDoc.id;
          return { id, ...orderDoc.data() as any };
        })
      })
    )    
  }
}
