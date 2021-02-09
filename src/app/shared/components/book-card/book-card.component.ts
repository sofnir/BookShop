import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book?: Book;
  @Input('show-actions') showActions = false;
  @Input('shopping-cart') shoppingCart?: ShoppingCart;

  constructor() {    
  }

  ngOnInit(): void {    
  }
}
