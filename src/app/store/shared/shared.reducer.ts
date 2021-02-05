import { setLoadingSpinner, setErrorMessage } from './shared.actions';
import { createReducer, on } from '@ngrx/store';

  export const SHARED_REDUCER_NODE = 'shared';

  export interface SharedState {
    showLoading: boolean
    error?: string
  }
  
  export const initialState: SharedState = {
    showLoading: false,
    error: '',
  };

  export const sharedReducer = createReducer(
    initialState,
    on(setLoadingSpinner, (state, action) => {
      return {
        ...state,
        showLoading: action.status,
      };
    }),
    on(setErrorMessage, (state, action) => {
      return {
        ...state,
        error: action.error,
      };
    })
  );