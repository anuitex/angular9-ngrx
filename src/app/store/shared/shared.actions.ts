import { createAction, props } from '@ngrx/store';

export const LOADING = '[Shared] Loading spinner';
export const ERROR = '[Shared] Error message';

export const setLoadingSpinner = createAction(
  LOADING,
  props<{ status: boolean }>()
);

export const setErrorMessage = createAction(
  ERROR,
  props<{ error: string }>()
);

