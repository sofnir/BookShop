import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser | null = null;
  shoppingCart$?: Observable<ShoppingCart>;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  async ngOnInit(): Promise<void> {
    this.shoppingCart$ = await this.shoppingCartService.getCart();
  }

  logout(): void {
    this.auth.logout();
  }
}
