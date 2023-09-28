import { Component } from '@angular/core';
import { IUpdate } from 'src/app/shared/interface/auth/auth.interfaces';
import { OrdersService } from 'src/app/shared/services/orders/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  constructor(
    private orderData: OrdersService
  ){}

  ngOnInit(): void {
    this.getOrders()
    
  }

  public orders!: Array<any>
  public user!: IUpdate
  public ordersLength!: number
  getOrders(){
    this.user = JSON.parse(localStorage.getItem('currentUser') as string)
    this.orderData.getOrders().subscribe(data => {
      this.orders = data
      this.orders = this.orders?.filter(order => order["userUid"] == this.user.uid)
      console.log(this.orders)
      this.ordersLength = this.orders.length
    })
  }

}
