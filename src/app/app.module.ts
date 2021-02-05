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
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { BookFormComponent } from './admin/components/book-form/book-form.component';
import { BookCardComponent } from './shared/components/book-card/book-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AdminOrdersComponent,
    AdminBooksComponent,
    ShoppingCartComponent,
    OrdersComponent,
    ProductsComponent,
    BookFormComponent,
    BookCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuardService] },
      { path: 'admin/books', component: AdminBooksComponent, canActivate: [AuthGuard, AdminAuthGuardService] },
      { path: 'admin/books/new', component: BookFormComponent, canActivate: [AuthGuard, AdminAuthGuardService] },
      { path: 'admin/books/:id', component: BookFormComponent, canActivate: [AuthGuard, AdminAuthGuardService] }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
