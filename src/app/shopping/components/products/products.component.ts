import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/shared/models/book';
import { BookService } from 'src/app/shared/services/book.service';

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

  constructor(private bookService: BookService) {
    this.booksSubscribtion = bookService.books$.subscribe(books => {
      this.allBooks = this.filteredBooks = books;
    });
  }

  ngOnInit(): void {
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
