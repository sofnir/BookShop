import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { BookService } from 'src/app/shared/services/book.service';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent implements OnInit {
  displayedColumns: string[] = ['title', 'author', 'quantity', 'price'];
  subscribtion!: Subscription;
  dataSource = new MatTableDataSource<Product>();
  shoppingCart$?: Observable<ShoppingCart>;
  shoppingCart?: ShoppingCart;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private bookService: BookService, private cartService: ShoppingCartService) {    
  }

  async ngOnInit(): Promise<void> {
    this.shoppingCart$ = await this.cartService.getCart();
    this.subscribtion = this.shoppingCart$.subscribe(cart => {
      this.shoppingCart = cart;      
      this.dataSource = new MatTableDataSource(cart.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;      
    })
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  delete(id: string) {
    this.bookService.delete(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clear() {
    if(!this.shoppingCart) return; 
    this.cartService.clearCart(this.shoppingCart);
  }
}
