import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input() book?: Book;  
  @Input('shopping-cart') shoppingCart?: ShoppingCart;  

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    if(this.book) {
      this.cartService.addToCart(this.book);
    }
  }

  removeFromCart() {
    if(this.book) {
      this.cartService.removeFromCart(this.book);
    }
  }

  getQuantity(): number {
    return (this.shoppingCart && this.book && this.book.id)
      ? this.shoppingCart?.getQuantity(this.book?.id)
      : 0;
  }
}
