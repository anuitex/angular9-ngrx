import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { sharedReducer, SharedState } from "../store/shared/shared.reducer";


export interface AppState 
{
  shared?: SharedState,
  pageNumber?: number,
  pageSize?: number,
  hasNextPage?: boolean,
  hasPreviousPage?: boolean
}

export const reducers: ActionReducerMap<AppState> = {
    shared: sharedReducer
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : []