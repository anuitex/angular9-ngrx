import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Constants } from 'src/app/constants/constants';
import { Order } from 'src/app/models/order/order-model';
import { AppState } from 'src/app/state/app-state';


import * as orderActions from 'src/app/store/order/order.actions'
import { authData } from '../account/account.reducer';

export const ORDER_REDUCER_NODE = 'order'

const client = authData

export interface OrderState extends AppState, EntityState<Order>{
  clientOrders: Order[]
  selectedOrder: Order
}

export const orderAdapter : EntityAdapter<Order> = createEntityAdapter<Order>()

export const initinalOrderState = orderAdapter.getInitialState({
  selectedOrder: null,
  clientOrders: null,
  pageNumber: Constants.FIRST_PAGE,
  pageSize: Constants.DEFAULT_PAGE_SIZE,
  hasNextPage: false,
  hasPreviousPage: false,
  error: null
})

export const orderReducer = createReducer(
  initinalOrderState,
  on(orderActions.getOrderSuccess, (state, action) => {
    return {
      ...state,
      selectedOrder: action.order
    }
  }),

  on(orderActions.getOrdersSuccess, (state, action) =>
    orderAdapter.setAll(action.response.data, {
      ...state,
      pageNumber: action.response.pageNumber,
      pageSize: action.response.pageSize,
      hasNextPage: action.response.hasNextPage,
      hasPreviousPage: action.response.hasPreviousPage
    })
  ),
  on(orderActions.getClientOrdersSuccess, (state, action) => {
    return {
      ...state,
      clientOrders: action.clientOrders
    }
  }),
  on(orderActions.createOrderSuccess, (state,action) => {
    localStorage.removeItem(client.Id)
    return {
      ...state,
      selectedOrder: action.order
    }
  }),
  on(orderActions.payOrderSuccess, state => {
    return {
      ...state,
      selectedOrder: null
    }
  })
)

export const { selectAll } = orderAdapter.getSelectors()
