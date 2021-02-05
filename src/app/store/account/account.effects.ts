import { Injectable } from '@angular/core';
import { Actions, createEffect,  ofType } from '@ngrx/effects';
import { catchError, delayWhen, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { ACCESS_TOKEN_KEY, AccountService, REFRESH_TOKEN_KEY } from '../../services/account.service';
import * as accountActions  from './account.actions';
import { AuthData } from 'src/app/models/account/auth-data.model';
import { setErrorMessage } from '../shared/shared.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AccountEffects {

  constructor(
      private actions$: Actions,
      private accountService: AccountService,
      private router: Router,
      private toastr: ToastrService
    ) { }

  signIn$ = createEffect(() => this.actions$.pipe(
      ofType(accountActions.signIn),
      mergeMap(action => this.accountService.signIn({
        email: action.email,
        password: action.password
      }).pipe(
        map((authData: AuthData) => { 
          return accountActions.signInSuccess(authData)
        }),
        catchError(data => {
          this.toastr.error(data.error.error)
          return of(setErrorMessage(data.error.error))
        })
      ))
  )) 

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.singUp),
    switchMap(action => this.accountService.signUp({
      name: action.name,
      surname: action.surname,
      username: action.username,
      email: action.email,
      password: action.password
    }).pipe(
      map(() => accountActions.signUpSuccess()),
      catchError(data => {
        this.toastr.error(data.error.error)
        return of(setErrorMessage(data.error.error))
      })
    ))
  ))

  signOut$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.signOut),
    switchMap((action) => this.accountService.signOut(action.email))
  ), { dispatch: false })

  confirmEmail$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.confirmEmail),
    switchMap(action => this.accountService.confirmEmail(action.email, action.token)
    .pipe(
      map(() => accountActions.confirmEmailSuccess()),
      catchError(data => {
        this.toastr.error(data.error.error)
        return of(setErrorMessage(data.error.error))
      })
    ))
  ))

  forgotPassword$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.forgotPassword),
    switchMap(action => this.accountService.forgotPassword(action.email)
    .pipe(
      map(() => accountActions.forgotPasswordSuccess()),
      catchError(data => {
        this.toastr.error(data.error.error)
        return of(setErrorMessage(data.error.error))
      })
    ))
  ))
 
  refreshTokens$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.signInSuccess),
    delayWhen(action => timer(action.exp * 1000 - 60 * 1000 - Date.now())),
    switchMap(() => this.accountService.refreshTokens({
      accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY)
    }).pipe(
      map((authData: AuthData) => accountActions.signInSuccess(authData))
    ))
  ))
}