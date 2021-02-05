import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PrintingEditionState, PRINTING_EDITION_REDUCER_NODE, selectAll } from './printing-edition.reducer';

const getPrintingEditionFeature = createFeatureSelector<PrintingEditionState>(PRINTING_EDITION_REDUCER_NODE)

export const getPrintingEdition = createSelector(
    getPrintingEditionFeature,
    state => state.currentPrintingEdition
)

export const getPrintingEditions = createSelector(
    getPrintingEditionFeature,
    selectAll
)

export const getHasPreviousPage = createSelector(
    getPrintingEditionFeature,
    state => state.hasPreviousPage
)

export const getHasNextPage = createSelector(
    getPrintingEditionFeature,
    state => state.hasNextPage
)

export const getPageSize = createSelector(
    getPrintingEditionFeature,
    state => state.pageSize
)

export const getPageNumber = createSelector(
    getPrintingEditionFeature,
    state => state.pageNumber
)