import { Update } from "@ngrx/entity"
import { createAction, props } from "@ngrx/store"
import { PrintingEditionFilter } from "src/app/models/filter/printing-edition-filter"
import { PrintingEditionItem } from "src/app/models/printing-edition/printing-edition-item"
import { PrintingEdition } from "src/app/models/printing-edition/printing-edition.model"
import { FilterPagedRequest } from "src/app/models/shared/filter-paged-request"
import { PagedResponse } from "src/app/models/shared/paged-responce"

export enum PrintingEditionActions
{
    GET_PRINTING_EDITION = '[Printing Edition] Get Printing Edition',
    GET_PRINTING_EDITION_SUCCESS = '[Printing Edition] Get Printing Edition Success',
  
    GET_PRINTING_EDITIONS = '[Printing Edition] Get Printing Editions',
    GET_PRINTING_EDITIONS_SUCCESS = '[Printing Edition] Get Printing Editions Success',
  
    GET_PAGE = '[Printing Edition] Get Page',
    GET_PAGE_SUCCESS = '[Printing Edition] Get Page Success',

    ADD_PRINTING_EDITION = '[Printing Edition] Add Printing Edition',
    ADD_PRINTING_EDITION_SUCCESS = '[Printing Edition] Add Printing Edition Success',

    DELETE_PRINTING_EDITION = '[Printing Edition] Delete Printing Edition',
    DELETE_PRINTING_EDITION_SUCCESS = '[Printing Edition] Delete Printing Edition Success',

    UPDATE_PRINTING_EDITION = '[Printing Edition] Update Printing Edition',
    UPDATE_PRINTING_EDITION_SUCCESS = '[Printing Edition] Update Printing Edition Success',
  }

  export const getPrintingEdition = createAction(
    PrintingEditionActions.GET_PRINTING_EDITION,
    props<{ id: string }>()
  )
  
  export const getPrintingEditionSuccess = createAction(
    PrintingEditionActions.GET_PRINTING_EDITION_SUCCESS,
    props<{ printingEdition: PrintingEdition }>()
  )

  export const getPage = createAction(
    PrintingEditionActions.GET_PAGE,
    props<{ request: FilterPagedRequest<PrintingEditionFilter> }>()
  )
  
  export const getPageSuccess = createAction(
    PrintingEditionActions.GET_PAGE_SUCCESS,
    props<{ response : PagedResponse<PrintingEdition> }>(),
  )

  export const getPrintingEditions = createAction(
    PrintingEditionActions.GET_PRINTING_EDITIONS
  )
  
  export const getPrintingEditionsSuccess = createAction(
    PrintingEditionActions.GET_PRINTING_EDITIONS_SUCCESS,
    props<{ data : PrintingEdition[] }>(),
  )

  export const addPrintingEdition = createAction(
    PrintingEditionActions.ADD_PRINTING_EDITION,
    props<{ printingEdition: PrintingEditionItem }>()
  )
  
  export const addPrintingEditionSuccess = createAction(
    PrintingEditionActions.ADD_PRINTING_EDITION_SUCCESS,
    props<{ added: PrintingEdition }>()
  )

  export const updatePrintingEdition = createAction(
    PrintingEditionActions.UPDATE_PRINTING_EDITION,
    props<{ printingEdition: PrintingEditionItem }>()
  )
  
  export const updatePrintingEditionSuccess = createAction(
    PrintingEditionActions.UPDATE_PRINTING_EDITION_SUCCESS,
    props<{ updated: Update<PrintingEdition> }>()
  )

  export const deletePrintingEdition = createAction(
    PrintingEditionActions.DELETE_PRINTING_EDITION,
    props<{ id: string }>()
  )
  
  export const deletePrintingEditionSuccess = createAction(
    PrintingEditionActions.DELETE_PRINTING_EDITION_SUCCESS,
    props<{ id: string }>()
  )

