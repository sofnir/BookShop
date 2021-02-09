import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['customer', 'date', 'view'];  
  dataSource: any[] = [];
  subscription: Subscription
  
  constructor(private orderService: OrderService) {
    this.subscription = this.orderService.getOrders().subscribe(orders => {
      this.dataSource = orders;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
