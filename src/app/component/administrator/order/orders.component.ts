import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { OrderState } from 'src/app/store/order/order.reducer';
import * as orderActions from "src/app/store/order/order.actions";
import * as selectors from '../../../store/order/order.selectors'
import { Order } from 'src/app/models/order/order-model';
import { OrderFilter } from 'src/app/models/filter/order-filter';
import { FormBuilder } from '@angular/forms';
import { OrderStatus } from 'src/app/enums/order-status';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-order',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  readonly roundTo = Constants.ROUND_TO;
  
  pageSize: number;
  pageNumber: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean; 

  searchTextVisible: boolean = false;
  searchText: string = "";

  filter: OrderFilter;

  orderStatus: OrderStatus;
  statusSelectVisible: boolean;

  orders: Order[];

  displayedColumns: string[] = ['order', 'date', 'client','product','title','quantity','order-amount','status'];

  constructor(
    private store: Store<OrderState>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void 
  {
    this.store.pipe(select(selectors.getPageSize)).subscribe(
      data => {
        this.pageSize = data;
      }
    );
    this.store.pipe(select(selectors.getPageNumber)).subscribe(
      data => {
        this.pageNumber = data;
      }
    );
    this.store.pipe(select(selectors.getHasNextPage)).subscribe(
      data => {
        this.hasNextPage = data;
      }
    );
    this.store.pipe(select(selectors.getHasPreviousPage)).subscribe(
      data => {
        this.hasPreviousPage = data;
      }
    );

    this.store.dispatch(orderActions.getOrders({ 
      request: {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber, 
        searchText: this.searchText,
        filter: null 
      }
    })); 

    this.store.pipe(select(selectors.getOrders)).subscribe(
      data => {
        this.orders = data;
      }
    );
  }

  nextPage()
  {
    if (this.hasNextPage)
    {
      this.store.dispatch(orderActions.getOrders({ 
        request: {
          pageNumber: this.pageNumber + Constants.INCREMENT,
          pageSize: this.pageSize,
          searchText: this.searchText,
          filter: this.filter
        }
      }));
    }
  }

  previousPage()
  {
    if (this.hasPreviousPage)
    {
      this.store.dispatch(orderActions.getOrders({ 
          request: {
          pageNumber: this.pageNumber - Constants.DECREMENT,
          pageSize: this.pageSize,
          searchText: this.searchText,
          filter: this.filter 
        }
      }));
    }
  }

  changeTableSize() 
  {
    this.store.dispatch(orderActions.getOrders({ request: {
      pageNumber: Constants.FIRST_PAGE,
      pageSize: this.pageSize,
      searchText: this.searchText,
      filter: this.filter }}
    ));
  }

  changeStatus()
  {
    const updateTime: number = 2000;

    setTimeout(() => {
      this.statusSelectVisible = false;

      if (status != null)
      {
        this.applyFilter();
      }
    }, updateTime);
  }

  applyFilter()
  {
    this.filter = {
      status: this.orderStatus
    };

    this.store.dispatch(orderActions.getOrders({ 
      request: {
        pageNumber: Constants.FIRST_PAGE,
        pageSize: this.pageSize,
        searchText: this.searchText,
        filter: this.filter
      }
    }));
    
    this.searchTextVisible = false;
  }
}
