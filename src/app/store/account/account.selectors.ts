import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState, ACCOUNT_REDUCER_NODE } from './account.reducer';
 
const getAccountFeature = createFeatureSelector<AccountState>(ACCOUNT_REDUCER_NODE)

export const getIsAuthenticated = createSelector(
    getAccountFeature,
    state => state.isAuthenticated
);

export const getIsEmailConfirmed = createSelector(
    getAccountFeature,
    state => state.isEmailConfirmed
);

export const getIsPasswordForgot = createSelector(
    getAccountFeature,
    state => state.isPasswordForgot
);

export const getIsSignedUp = createSelector(
    getAccountFeature,
    state => state.isSignedUp
);

export const getRole = createSelector(
    getAccountFeature,
    state => state.authData?.role
)

export const getAuthData = createSelector(
    getAccountFeature,
    state => state.authData
)

export const getId = createSelector(
    getAccountFeature,
    state => state.authData?.Id
)

export const getEmail = createSelector(
    getAccountFeature,
    state => state.authData?.Email
)


