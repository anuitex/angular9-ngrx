import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState, SHARED_REDUCER_NODE } from './shared.reducer';


const getSharedFeature = createFeatureSelector<SharedState>(SHARED_REDUCER_NODE);

    export const getLoading = createSelector(
        getSharedFeature, 
        state => state.showLoading
    );

    export const getErrorMessage = createSelector(
        getSharedFeature, 
        state => state.error
    )