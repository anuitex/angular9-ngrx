import { Update } from "@ngrx/entity"
import { createAction, props } from "@ngrx/store"
import { UserFilter } from "src/app/models/filter/user-filter"
import { FilterPagedRequest } from "src/app/models/shared/filter-paged-request"
import { PagedResponse } from "src/app/models/shared/paged-responce"
import { User } from "src/app/models/user/user.model"
import { EditUserModel } from "../../models/user/edit-user.model"


export enum UserActions
{
    GET_USER = "[User] Get User",
    GET_USER_SUCCESS = "[User] Get User Success",
  
    GET_USERS = "[User] Get Users",
    GET_USERS_SUCCESS = "[User] Get Users Success",
  
    UPDATE_USER = "[User] Edit User",
    UPDATE_USER_SUCCESS = "[User] Edit User Success",
  
    CHANGE_USER_BLOCK_STATUS = "[User] Change User Block status",
    CHANGE_USER_BLOCK_STATUS_SUCCESS = "[User] Change User Block status Success",
  
    DELETE_USER = "[User] Delete User",
    DELETE_USER_SUCCESS = "[User] Delete User Success"
}

  export const getUser = createAction(
    UserActions.GET_USER,
    props<{ id: string }>()
  )
  
  export const getUserSuccess = createAction(
    UserActions.GET_USER_SUCCESS,
    props<{ user: User }>()
  )

  export const getUsers = createAction(
    UserActions.GET_USERS,
    props <{ request: FilterPagedRequest<UserFilter> }>()
  )
  
  export const getUsersSuccess = createAction(
    UserActions.GET_USERS_SUCCESS,
    props<{ response : PagedResponse<User> }>()
  )

  export const updateUser = createAction(
    UserActions.UPDATE_USER,
    props<{ user: EditUserModel }>()
  )

  export const updateUserSuccess = createAction(
    UserActions.UPDATE_USER_SUCCESS,
    props<{ updated: Update<User> }>()
  )

  export const deleteUser = createAction(
    UserActions.DELETE_USER,
    props<{ id: string }>()
  )

  export const deleteUserSuccess = createAction(
    UserActions.DELETE_USER_SUCCESS,
    props<{ id: string }>()
  )

  export const changeBlockStatus = createAction(
    UserActions.CHANGE_USER_BLOCK_STATUS,
    props<{ id: string }>()
  )
  
  export const changeBlockStatusSuccess = createAction(
    UserActions.CHANGE_USER_BLOCK_STATUS_SUCCESS,
    props<{ user: Update<User> }>()
  )
