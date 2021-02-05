import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators"
import { UserService } from "src/app/services/user.service"
import { setErrorMessage } from "../shared/shared.actions"
import * as userActions from "./user.actions"

@Injectable()
export class UserEffects
{
    constructor(
        private actions$: Actions,  
        private service$: UserService
    ){}

    getUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.getUser),
        switchMap(action => this.service$.getUser(action.id).pipe(
            map(user => userActions.getUserSuccess({ user: user })),
            catchError(data => {
                return of(setErrorMessage(data.error.error))
            })
        ))
    ))

    getUsers$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.getUsers),
        mergeMap(action => this.service$.getUsers(action.request).pipe(
            map(response => userActions.getUsersSuccess({ response: response })),
            catchError(data => {
                return of(setErrorMessage(data.error.error))
            })
        ))
    ))

    editUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.updateUser),
        switchMap((action) => this.service$.updateUser(action.user).pipe(
          map((updated) => userActions.updateUserSuccess({ updated: {
            id: updated.id,
            changes: updated
          }})),
          catchError(data => {
            return of(setErrorMessage(data.error.error))
          })
        ))
    ))

    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.deleteUser),
        switchMap(action => this.service$.deleteUser(action.id).pipe(
          map((id) => userActions.deleteUserSuccess({ id : id })),
          catchError(data => {
            return of(setErrorMessage(data.error.error))
          })
        ))
    ))

    changeBlockStatus$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.changeBlockStatus),
        switchMap(action => this.service$.changeBlockStatus(action.id).pipe(
            map(changed => userActions.changeBlockStatusSuccess({ user: {
                id: changed.id,
                changes: changed
            }})) 
        ))
    ))
}