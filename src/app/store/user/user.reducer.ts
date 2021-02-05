import { createEntityAdapter } from '@ngrx/entity';
import { EntityAdapter, EntityState } from '@ngrx/entity/src/models';
import { createReducer, on } from '@ngrx/store';
import { Constants } from 'src/app/constants/constants';
import { User } from 'src/app/models/user/user.model';
import { AppState } from 'src/app/state/app-state';
import * as userActions from './user.actions'

export const USER_REDUCER_NODE = 'user'

export interface UserState extends AppState, EntityState<User> {
  currentUser: User,
  pageNumber: number,
  pageSize: number,
  hasNextPage: false,
  hasPreviousPage: false
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>()

export const initialUserState = adapter.getInitialState({
  currentUser: null,
    pageNumber: Constants.FIRST_PAGE,
    pageSize: Constants.DEFAULT_PAGE_SIZE,
    hasNextPage: false,
    hasPreviousPage: false,
    error: null
})

export const userReducer = createReducer(
  initialUserState,
  on(userActions.getUserSuccess, (state, action) => {
    return{
      ...state,
      currentUser: action.user
    }
  }),
  on(userActions.getUsersSuccess, (state, action) =>
    adapter.setAll(action.response.data, {
      ...state,
      pageNumber: action.response.pageNumber,
      pageSize: action.response.pageSize,
      hasNextPage: action.response.hasNextPage,
      hasPreviousPage: action.response.hasPreviousPage
    })
  ),
  on(userActions.updateUserSuccess, (state, action) => 
    adapter.updateOne(action.updated, state)
  ),
  on(userActions.changeBlockStatusSuccess, (state, action) =>
    adapter.updateOne(action.user, state)
  ),
  on(userActions.deleteUserSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  )
)

export const { selectAll } = adapter.getSelectors()