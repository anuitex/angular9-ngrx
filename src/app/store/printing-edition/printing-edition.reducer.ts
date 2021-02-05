import { createReducer, on } from "@ngrx/store";
import { PrintingEdition } from "src/app/models/printing-edition/printing-edition.model";
import * as printingEditionActions from './printing-edition.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Constants } from "src/app/constants/constants";

export const PRINTING_EDITION_REDUCER_NODE = 'printing edition'

export interface PrintingEditionState extends EntityState<PrintingEdition>{
    currentPrintingEdition: PrintingEdition,
    pageNumber: number,
    pageSize: number,
    hasNextPage: false,
    hasPreviousPage: false
}

export const adapter: EntityAdapter<PrintingEdition> = createEntityAdapter<PrintingEdition>()

export const initialState = adapter.getInitialState({
    currentPrintingEdition: null,
    pageNumber: Constants.FIRST_PAGE,
    pageSize: Constants.DEFAULT_PAGE_SIZE,
    hasNextPage: false,
    hasPreviousPage: false,
    error: null
})
  
export const printingEditionReducer = createReducer(
    initialState,
    on(printingEditionActions.getPrintingEditionSuccess, (state, action) => {
        return {
            ...state,
            currentPrintingEdition: action.printingEdition
        }
    }),
    on(printingEditionActions.getPageSuccess, (state, action) =>
        adapter.setAll(action.response.data, {
            ...state,
            pageNumber: action.response.pageNumber,
            pageSize: action.response.pageSize,
            hasNextPage: action.response.hasNextPage,
            hasPreviousPage: action.response.hasPreviousPage
        })
    ),
    on(printingEditionActions.getPrintingEditionsSuccess, (state, action) =>
        adapter.setAll(action.data, {
            ...state,
        })
    ),
    on(printingEditionActions.addPrintingEditionSuccess, (state, action) =>
        adapter.addOne(action.added, state)
    ),
    on(printingEditionActions.updatePrintingEditionSuccess, (state, action) =>
        adapter.updateOne(action.updated, state)
    ),
    on(printingEditionActions.deletePrintingEditionSuccess, (state, { id }) =>
        adapter.removeOne(id, state)
    )
)

export const { selectAll } = adapter.getSelectors();
