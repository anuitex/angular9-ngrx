import { createAction, props } from '@ngrx/store';
import { AuthData } from 'src/app/models/account/auth-data.model';
import { SignUpModel } from '../../models/account/sign-up.model';
import { Tokens } from '../../models/account/tokens.model';

export enum AccountActions {
    SIGN_IN = '[Account] Sign In',
    SIGN_IN_SUCCESS = '[Account] Sign In Success',

    SIGN_UP = '[Account] Sign Up',
    SIGN_UP_SUCCESS = '[Account] Sign Up Success',

    SIGN_OUT = '[Account] Sign Out',

    CONFIRM_EMAIL = '[Account] Confirm Email',
    CONFIRM_EMAIL_SUCCESS = '[Account] Confirm Email Success',

    FORGOT_PASSWORD = '[Account] Forgot Password',
    FORGOT_PASSWORD_SUCCESS = '[Account] Forgot Password Success',

    REFRESH_TOKENS = '[Account] Refresh Tokens'
}

export const signIn = createAction(AccountActions.SIGN_IN, props<{ email: string, password: string }>());
export const signInSuccess = createAction(AccountActions.SIGN_IN_SUCCESS, props<AuthData>());

export const singUp = createAction(AccountActions.SIGN_UP, props<SignUpModel>());
export const signUpSuccess = createAction(AccountActions.SIGN_UP_SUCCESS);

export const signOut = createAction(AccountActions.SIGN_OUT, props<{ email: string }>());

export const forgotPassword = createAction(AccountActions.FORGOT_PASSWORD, props<{ email: string }>());
export const forgotPasswordSuccess = createAction(AccountActions.FORGOT_PASSWORD_SUCCESS);

export const confirmEmail = createAction(AccountActions.CONFIRM_EMAIL, props<{ email: string, token: string }>());
export const confirmEmailSuccess = createAction(AccountActions.CONFIRM_EMAIL_SUCCESS);

export const refreshTokens = createAction(AccountActions.REFRESH_TOKENS, props<Tokens>());


