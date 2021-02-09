import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['customer', 'date', 'view'];  
  dataSource: any[] = [];
  
  constructor(private orderService: OrderService, private authService: AuthService) { 
    this.authService.fbUser$.subscribe(user => {
      this.orderService.getOrders().subscribe(orders => {
        const userOrders = orders.filter(o => o.userId == user?.uid);
        this.dataSource = userOrders;
      })
    })
  }

  ngOnInit(): void {
  }
}
