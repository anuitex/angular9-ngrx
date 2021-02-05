import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { AuthorItem } from "src/app/models/author/author-item";
import { Author } from "src/app/models/author/author-model";
import { PagedRequest } from "src/app/models/shared/paged-request";
import { PagedResponse } from "src/app/models/shared/paged-responce";

export enum AuthorActions {
    GET_AUTHOR = '[Author] Get Author',
    GET_AUTHOR_SUCCESS = '[Author] Get Author Success',
  
    GET_PAGE = '[Author] Get Page',
    GET_PAGE_SUCCESS = '[Author] Get Page Success',
    
    GET_AUTHORS = '[Author] Get Authors',
    GET_AUTHORS_SUCCESS = '[Author] Get Authors Success',
  
    ADD_AUTHOR = '[Author] Add Author',
    ADD_AUTHOR_SUCCESS = '[Author] Add Author Success',
  
    UPDATE_AUTHOR = '[Author] Update Author',
    UPDATE_AUTHOR_SUCCESS = '[Author] Update Author Success',
  
    DELETE_AUTHOR = '[Author] Delete Author',
    DELETE_AUTHOR_SUCCESS = '[Author] Delete Author Success',
}

export const getAuthor = createAction(
    AuthorActions.GET_AUTHOR,
    props<{ id: string }>()
)

export const getAuthorSuccess = createAction(
    AuthorActions.GET_AUTHOR_SUCCESS,
    props<{ author: Author }>()
)

export const getPage = createAction(
    AuthorActions.GET_PAGE,
    props<{ request: PagedRequest }>()
)

export const getPageSuccess = createAction(
    AuthorActions.GET_PAGE_SUCCESS,
    props<{ response : PagedResponse<Author> }>()
)

export const getAuthors = createAction(
  AuthorActions.GET_AUTHORS
)

export const getAuthorsSuccess = createAction(
  AuthorActions.GET_AUTHORS_SUCCESS,
  props<{ authors : Author[] }>()
)

export const addAuthor = createAction(
    AuthorActions.ADD_AUTHOR,
    props<{ author: AuthorItem }>()
)
  
  export const addAuthorSuccess = createAction(
    AuthorActions.ADD_AUTHOR_SUCCESS,
    props<{ added: Author }>()
  )
  
  export const updateAuthor = createAction(
    AuthorActions.UPDATE_AUTHOR,
    props<{ author: AuthorItem }>()
  )
  
  export const updateAuthorSuccess = createAction(
    AuthorActions.UPDATE_AUTHOR_SUCCESS,
    props<{ updated: Update<Author> }>()
  )
  
  export const deleteAuthor = createAction(
    AuthorActions.DELETE_AUTHOR,
    props<{ id: string }>()
  )
  
  export const deleteAuthorSuccess = createAction(
    AuthorActions.DELETE_AUTHOR_SUCCESS,
    props<{ id: string }>()
  )


