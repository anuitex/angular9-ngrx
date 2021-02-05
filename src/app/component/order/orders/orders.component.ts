import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Constants } from 'src/app/constants/constants';
import { Order } from 'src/app/models/order/order-model';
import { OrderService } from 'src/app/services/order.service';
import { AccountState } from 'src/app/store/account/account.reducer';
import { getId } from 'src/app/store/account/account.selectors';
import * as actions from 'src/app/store/order/order.actions';
import { OrderState } from 'src/app/store/order/order.reducer';
import { getClientOrders } from 'src/app/store/order/order.selectors';

@Component({
  selector: 'app-client-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit 
{
  readonly roundTo = Constants.ROUND_TO;

  paid = 1;
  unpaid = 2;

  orders: Order[];
  displayedColumns: string[] = ['order', 'date', 'client','product','title','quantity','order-amount','status'];

  currentId: string; 

  constructor(
    private order: OrderService,
    private store: Store<OrderState>,
    private accountStore: Store<AccountState>
  ) {}

  ngOnInit(): void 
  {
    this.accountStore.pipe(select(getId)).subscribe(
      data => {
        this.currentId = data
      }
    );

    this.store.dispatch(actions.getClientOrders());
    this.store.select(getClientOrders).subscribe(
      orders => {
        this.orders = orders
      }
    );
  }

  payOrder(id: string)
  {
    this.store.dispatch(actions.getOrder({ id: id }));
  }
}