import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/book';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { BookService } from 'src/app/shared/services/book.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allBooks: Book[] = [];
  filteredBooks: Book[] = [];
  booksSubscribtion: Subscription;
  categories = [
    'All categories',
    'Adventure',
    'Fantasy',
    'History'
  ]
  shoppingCart$?: Observable<ShoppingCart>;

  constructor(private bookService: BookService, private cartService: ShoppingCartService) {
    this.booksSubscribtion = bookService.getAll().subscribe(books => {
      this.allBooks = this.filteredBooks = books;
    });
  }

  async ngOnInit(): Promise<void> {    
    this.shoppingCart$ = await this.cartService.getCart();
  }

  ngOnDestroy(): void {
    this.booksSubscribtion.unsubscribe();
  }

  filterBooksByCategory($event: any) {
    if($event.value == 'All categories') {
      this.filteredBooks = this.allBooks;  
    } else {
      this.filteredBooks = this.allBooks.filter(b => b.category == $event.value);
    }
  }
}
