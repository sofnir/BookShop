import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { MaterialModule } from './shared/material/material.module';
import { RouterModule } from '@angular/router';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminBooksComponent } from './admin/components/admin-books/admin-books.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { OrdersComponent } from './shopping/components/orders/orders.component';
import { ProductsComponent } from './shopping/components/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AdminOrdersComponent,
    AdminBooksComponent,
    ShoppingCartComponent,
    OrdersComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'admin/orders', component: AdminOrdersComponent },
      { path: 'admin/books', component: AdminBooksComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
