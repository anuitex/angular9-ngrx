import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthorState, AUTHOR_REDUCER_NODE, selectAll } from './author.reducer';

export const getAuthorFeature = createFeatureSelector<AuthorState>(AUTHOR_REDUCER_NODE)

export const getAuthors = createSelector(
  getAuthorFeature,
  selectAll
)

export const getHasPreviousPage = createSelector(
  getAuthorFeature,
  state => state.hasPreviousPage
)

export const getHasNextPage = createSelector(
  getAuthorFeature,
  state => state.hasNextPage
)

export const getPageSize = createSelector(
  getAuthorFeature,
  state => state.pageSize
)

export const getPageNumber = createSelector(
  getAuthorFeature,
  state => state.pageNumber
)