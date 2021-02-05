import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { OrderItem } from 'src/app/models/order/order-item-model';
import { CartService } from 'src/app/services/cart.service';
import { createOrder } from 'src/app/store/order/order.actions';
import { OrderState } from 'src/app/store/order/order.reducer';
import { ToastrService } from 'ngx-toastr';
import { AccountState } from 'src/app/store/account/account.reducer';
import { getId } from 'src/app/store/account/account.selectors';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit 
{

  readonly roundTo = Constants.ROUND_TO;
  
  displayedColumns: string[] = ['product', 'unit-price', 'qty', 'order-amount','actions'];
  items: OrderItem[] = null;

  cartCheck: boolean = false;

  cartIsNull: boolean;
  quantityError: boolean;

  currentId: string;

  constructor(
    private cart: CartService,
    private store: Store<OrderState>,
    private dialog: MatDialogRef<CheckoutComponent>,
    private accountStore: Store<AccountState>,
    private toastr: ToastrService)   
  {
    cart.cartItems.subscribe(
      cartItems => {
        this.items = cartItems;
      }
    )
  }

  ngOnInit(): void 
  {
    this.items = this.cart.getCart;

    if(this.items === null) 
    {
      this.cartIsNull = true;
    }

    this.accountStore.pipe(select(getId)).subscribe(
      data => {
        this.currentId = data
      }
    );
  }

  changeProductQuantity(orderItem: OrderItem, $event) 
  {
    var number = Number($event.target.value);
    
    if (number < Constants.MIN_QUANTITY) 
    {
      this.quantityError = true;
      return;
    }
    if (number > Constants.MIN_QUANTITY) 
    {
      this.quantityError = false;
    }

    this.cart.changeQuantity(orderItem, number);
  }

  deleteProduct(orderItem: OrderItem) 
  {
    this.cart.delete(orderItem);
  }

  buy() 
  {
    this.store.dispatch(createOrder({ items: this.items}));
    this.dialog.close();
  }

  close() 
  {
    this.dialog.close();
  }

  addOne(orderItem: OrderItem) 
  { 
    this.cart.addOne(orderItem);
  }

  removeOne(orderItem: OrderItem) 
  {
    this.cart.removeOne(orderItem);
  }
}
