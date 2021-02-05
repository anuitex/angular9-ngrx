import { createFeatureSelector, createSelector } from '@ngrx/store'
import { OrderState, ORDER_REDUCER_NODE, selectAll } from './order.reducer'

const getOrderFeature = createFeatureSelector<OrderState>(ORDER_REDUCER_NODE)

export const getOrders = createSelector(
  getOrderFeature,
  selectAll
)

export const getOrder = createSelector(
  getOrderFeature,
  state => state.selectedOrder
)

export const getClientOrders = createSelector(
    getOrderFeature,
    state => state.clientOrders
)

export const getHasPreviousPage = createSelector(
  getOrderFeature,
  state => state.hasPreviousPage
)

export const getHasNextPage = createSelector(
  getOrderFeature,
  state => state.hasNextPage
)

export const getPageSize = createSelector(
  getOrderFeature,
  state => state.pageSize
)

export const getPageNumber = createSelector(
  getOrderFeature,
  state => state.pageNumber
)

