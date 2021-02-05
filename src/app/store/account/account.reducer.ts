import { JwtHelperService } from '@auth0/angular-jwt';
import { createReducer, on } from '@ngrx/store';
import * as accountActions from 'src/app/store/account/account.actions';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'src/app/services/account.service';
import { AuthData } from '../../models/account/auth-data.model';

export const ACCOUNT_REDUCER_NODE = 'account'

export let authData: AuthData = new JwtHelperService().decodeToken(localStorage.getItem(ACCESS_TOKEN_KEY))

function loggedInState(){
  if (new JwtHelperService().isTokenExpired(localStorage.getItem(ACCESS_TOKEN_KEY)))
  {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    return false;
  }

  return true;
}

export interface AccountState 
{
  isAuthenticated: boolean;
  isSignedUp: boolean;
  isEmailConfirmed: boolean;
  isPasswordForgot: boolean;
  authData?: AuthData;
  error?: undefined;
}

export const initialState: AccountState = {
  isAuthenticated: loggedInState(),
  isSignedUp: false,
  isEmailConfirmed: false,
  isPasswordForgot: false,
  authData: loggedInState() ? authData : null,
  error: null
};

export const accountReducer = createReducer(
  initialState,
  on(accountActions.signInSuccess, (state, action) =>({
    ...state,
    isAuthenticated: true,
    authData: action
  })),
  on(accountActions.signUpSuccess, state => ({
    ...state,
    isSignedUp: true,
  })),
  on(accountActions.signOut, state => ({
    ...state,
    isAuthenticated: false,
    isSignedUp: false,
    isEmailConfirmed: false,
    isPasswordReset: false,
    AuthData: null,
    error: null
  })),
  on(accountActions.confirmEmailSuccess, state => ({
    ...state,
    isEmailConfirmed: true
  })),
  on(accountActions.forgotPasswordSuccess, state => ({
    ...state,
    isPasswordForgot: true
  }))
)
