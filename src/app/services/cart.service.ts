import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Constants } from '../constants/constants';
import { OrderItem } from '../models/order/order-item-model';
import { PrintingEdition } from '../models/printing-edition/printing-edition.model';
import { AccountState } from '../store/account/account.reducer';
import { getId } from '../store/account/account.selectors';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  clientId: string = null;
  items: Array<OrderItem> = [];

  cartItems = new BehaviorSubject(this.getCart);

  constructor(private store: Store<AccountState>) 
  {
    store.pipe(select(getId)).subscribe(
      id => {
        this.clientId = id;
      }
    );
  }

  set setCart(orderItems: OrderItem[]) 
  {
    this.cartItems.next(orderItems);
    localStorage.setItem(this.clientId, JSON.stringify(orderItems));
  }

  get getCart() 
  {
    return JSON.parse(localStorage.getItem(this.clientId));
  }

  createCart() 
  {
    localStorage.setItem(this.clientId, null);
  }

  changeQuantity(product: OrderItem, quantity: number) 
  {
    this.items = this.getCart;
    let orderItemIndex = this.items.findIndex(i => i.printingEditionId === product.printingEditionId);
    this.items[orderItemIndex].count = quantity;
    this.setCart = this.items;
  }

  addOne(item: OrderItem) 
  {
    this.items = this.getCart;

    let orderItemIndex = this.items.findIndex(i => i.printingEditionId === item.printingEditionId);

    this.items[orderItemIndex].count += Constants.ONE_ITEM;
    this.setCart = this.items;
  }

  removeOne(item: OrderItem) 
  {
    this.items = this.getCart;

    let orderItemIndex = this.items.findIndex(i => i.printingEditionId === item.printingEditionId);

    this.items[orderItemIndex].count -= Constants.ONE_ITEM;
    this.setCart = this.items;
  }

  add(printingEdition: PrintingEdition, count: number) 
  {
    let item: OrderItem = {
      id: Constants.DEFAULT_ID,
      count: count,
      currency: printingEdition.currency,
      printingEditionId: printingEdition.id,
      printingEdition: printingEdition,
      orderId: Constants.DEFAULT_ID,
      order: null
    }

    let cart = this.getCart

    if(cart === null) 
    {
      this.createCart();
      this.items.push(item);
      this.setCart = this.items;
      return;
    }

    this.items = this.getCart;

    if (this.items.find(i => i.printingEditionId === printingEdition.id)) 
    {
      let index = this.items.findIndex(i => i.printingEditionId === printingEdition.id);
      this.items[index].count += count;
    }
    if (!this.items.find(i => i.printingEditionId === printingEdition.id)) 
    {
      this.items.push(item);
    }

    this.setCart = this.items;
    this.items = [];
  }

  delete(item: OrderItem) 
  {
    this.items = this.getCart;

    let index = this.items.findIndex(i => i.printingEditionId = item.printingEditionId);
    if (index != Constants.NOT_FOUND_INDEX)
    {
      this.items.splice(index, Constants.ONE_ITEM);
    }

    this.setCart = this.items;
  }

  clean() 
  {
    localStorage.removeItem(this.clientId);
  }
}
