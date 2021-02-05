import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { AuthorService } from "src/app/services/author.service";
import { setErrorMessage } from "../shared/shared.actions";
import * as authorActions from './author.actions'


@Injectable()
export class AuthorEffects{

    constructor(
        private actions$: Actions,  
        private service$: AuthorService
    ){}

    getAuthor$ = createEffect(() => this.actions$.pipe(
        ofType(authorActions.getAuthor),
        switchMap(action => this.service$.getAuthor(action.id).pipe(
            map(author => authorActions.getAuthorSuccess({ author: author })),
            catchError(data => {
                return of(setErrorMessage(data.error.error))
              })
        ))
    ))

    getAuthors$ = createEffect(() => this.actions$.pipe(
        ofType(authorActions.getAuthors),
        switchMap(()=> this.service$.getAuthors().pipe(
            map(authors => authorActions.getAuthorsSuccess({ authors: authors })),
            catchError(data => {
                return of(setErrorMessage(data.error.error))
              })
        ))
    ))

    getPage$ = createEffect(() => this.actions$.pipe(
        ofType(authorActions.getPage),
        switchMap(action => this.service$.getPage(action.request).pipe(
            map(response => authorActions.getPageSuccess({ response : response })),
            catchError(data => {
                return of(setErrorMessage(data.error.error))
              })
        ))
    ))

    addAuthor$ = createEffect(() => this.actions$.pipe(
        ofType(authorActions.addAuthor),
        switchMap(action => this.service$.addAuthor(action.author).pipe(
            map((author) => authorActions.addAuthorSuccess({ added: author })),
            catchError(data => {
                return of(setErrorMessage(data.error.error))
              })     
        ))
    ))

    updateAuthor$ = createEffect(() => this.actions$.pipe(
        ofType(authorActions.updateAuthor),
        switchMap(action => this.service$.updateAuthor(action.author).pipe(
          map(author => authorActions.updateAuthorSuccess({ updated: {
                id: author.id,
                changes: author
          }})),
          catchError(data => {
            return of(setErrorMessage(data.error.error))
          })
        ))
    ))

    deleteAuthor$ = createEffect(() => this.actions$.pipe(
        ofType(authorActions.deleteAuthor),
        switchMap(action => this.service$.deleteAuthor(action.id).pipe(
          map((id) => authorActions.deleteAuthorSuccess({ id : id })),
          catchError(data => {
            return of(setErrorMessage(data.error.error))
          })
        ))
    ))
}