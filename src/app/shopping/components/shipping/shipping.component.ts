import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { OrderService } from 'src/app/shared/services/order.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {  
  shoppingCart$?: Observable<ShoppingCart>;
  shoppingCart?: ShoppingCart;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),    
    city: new FormControl('', Validators.required)    
  });

  displayedColumns: string[] = ['title', 'price'];
  dataSource: any;

  constructor(private authService: AuthService, private cartService: ShoppingCartService, private orderService: OrderService) { }

  async ngOnInit() {
    this.shoppingCart$ = await this.cartService.getCart();
    this.shoppingCart$.subscribe(cart => {
      this.shoppingCart = cart;
      this.dataSource = cart.products;
    })
  }

  async onSubmit() {
    this.authService.fbUser$.subscribe(async user => {
      if(!this.shoppingCart || !this.shoppingCart.products || !user) return;
      await this.orderService.createOrder(user?.uid, this.form.value, this.shoppingCart.products);
      this.cartService.clearCart(this.shoppingCart);
    });
  }
}
