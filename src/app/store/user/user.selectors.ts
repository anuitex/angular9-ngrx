import { createFeatureSelector, createSelector } from "@ngrx/store";
import { selectAll, UserState, USER_REDUCER_NODE } from "./user.reducer";

const getUserFeature = createFeatureSelector<UserState>(USER_REDUCER_NODE)

export const getCurrentUser = createSelector(
    getUserFeature,
    state => state.currentUser
)

export const getUsers = createSelector(
    getUserFeature,
    selectAll
)

export const getHasPreviousPage = createSelector(
    getUserFeature,
    state => state.hasPreviousPage
  )
  
  export const getHasNextPage = createSelector(
    getUserFeature,
    state => state.hasNextPage
  )
  
  export const getPageSize = createSelector(
    getUserFeature,
    state => state.pageSize
  )
  
  export const getPageNumber = createSelector(
    getUserFeature,
    state => state.pageNumber
  )

