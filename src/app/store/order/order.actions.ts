import { createAction, props } from '@ngrx/store';
import { OrderFilter } from 'src/app/models/filter/order-filter';
import { OrderItem } from 'src/app/models/order/order-item-model';
import { Order } from 'src/app/models/order/order-model';
import { FilterPagedRequest } from 'src/app/models/shared/filter-paged-request';
import { PagedResponse } from 'src/app/models/shared/paged-responce';

export enum OrderActions{
  GET_ORDER = "[Order] Get Order",
  GET_ORDER_SUCCESS = "[Order] Get Order Success",

  GET_ORDERS = "[Order] Get Orders",
  GET_ORDERS_SUCCESS = "[Order] Get Orders Success",

  GET_CLIENT_ORDERS = "[Order] Get Client Orders",
  GET_CLIENT_ORDERS_SUCCESS = "[Order] Get Client Orders Success",

  CREATE_ORDER = "[Order] Create Order",
  CREATE_ORDER_SUCCESS = "[Order] Create Order Success",

  PAY_ORDER = "[Order] Pay Order",
  PAY_ORDER_SUCCESS = "[Order] Pay Order Success",
}

export const getOrders = createAction(
    OrderActions.GET_ORDERS,
    props <{ request: FilterPagedRequest<OrderFilter> }>()
  )
  
  export const getOrdersSuccess = createAction(
    OrderActions.GET_ORDERS_SUCCESS,
    props<{ response : PagedResponse<Order> }>()
  )
  
  export const getOrder = createAction (
    OrderActions.GET_ORDER,
    props<{ id: string }>()
  )
  
  export const getOrderSuccess = createAction(
    OrderActions.GET_ORDER_SUCCESS,
    props<{ order: Order }>()
  )
  
  export const createOrder = createAction(
    OrderActions.CREATE_ORDER,
    props<{ items: OrderItem[] }>()
  )
  
  export const createOrderSuccess = createAction(
    OrderActions.CREATE_ORDER_SUCCESS,
    props<{ order: Order }>()
  )

  export const getClientOrders = createAction(
    OrderActions.GET_CLIENT_ORDERS
  )
  
  export const getClientOrdersSuccess = createAction(
    OrderActions.GET_CLIENT_ORDERS_SUCCESS,
    props<{ clientOrders: Order[] }>()
  )

  export const payOrder = createAction(
    OrderActions.PAY_ORDER,
    props<{ order: Order, token: any }>()
  )
  
  export const payOrderSuccess = createAction(
    OrderActions.PAY_ORDER_SUCCESS,
  )
