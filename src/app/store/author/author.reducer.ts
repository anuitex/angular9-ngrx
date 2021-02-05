import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity"
import { createReducer, on } from "@ngrx/store"
import { Constants } from "src/app/constants/constants"
import { Author } from "src/app/models/author/author-model"
import { AppState } from "src/app/state/app-state"
import * as authorActions from './author.actions'

export const AUTHOR_REDUCER_NODE = 'author'

export interface AuthorState extends AppState, EntityState<Author>{
  selectedAuthor: Author,
  error: undefined
}

export const adapter: EntityAdapter<Author> = createEntityAdapter<Author>()

export const initialAuthorState = adapter.getInitialState({
  selectedAuthor: null,
  pageNumber: Constants.FIRST_PAGE,
  pageSize: Constants.DEFAULT_PAGE_SIZE,
  hasNextPage: false,
  hasPreviousPage: false,
  error: null
})

export const authorReducer = createReducer(
    initialAuthorState,
    on(authorActions.getAuthorSuccess, (state, action) => {
        return {
          ...state,
          selectedAuthor: action.author
        }
    }),
    on(authorActions.getAuthorsSuccess, (state, action) =>
        adapter.setAll(action.authors, {
            ...state,
        })
    ),
    on(authorActions.getPageSuccess, (state, action) =>
        adapter.setAll(action.response.data, {
            ...state,
            pageNumber: action.response.pageNumber,
            pageSize: action.response.pageSize,
            hasNextPage: action.response.hasNextPage,
            hasPreviousPage: action.response.hasPreviousPage
        })
    ),
    on(authorActions.addAuthorSuccess, (state, action) =>
        adapter.addOne(action.added, state)
    ),
    on(authorActions.updateAuthorSuccess, (state, action) =>
        adapter.updateOne(action.updated, state)
    ),
    on(authorActions.deleteAuthorSuccess, (state, { id }) =>
        adapter.removeOne(id, state)
    )
)

export const { selectAll } = adapter.getSelectors()
    
