import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PrintingEditionService } from 'src/app/services/printing-edition.service';
import { setErrorMessage } from "../shared/shared.actions";
import * as actions from './printing-edition.actions';

@Injectable()
export class PrintingEditionEffects{

  constructor(
      private actions$: Actions, 
      private service: PrintingEditionService
  ){}

  getPrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getPrintingEdition),
    switchMap(action => this.service.getPrintingEdition(action.id).pipe(
      map(printingEdition => actions.getPrintingEditionSuccess({ printingEdition: printingEdition })),
      catchError(data => {
        return of(setErrorMessage(data.error.error))
      })
    ))
  ));

  getPrintingEditions$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getPrintingEditions),
    switchMap(() => this.service.getPrintingEditions().pipe(
      map(data => actions.getPrintingEditionsSuccess({ data : data })),
      catchError(data => {
        return of(setErrorMessage(data.error.error))
      })
    ))
  ));

  getPage$ = createEffect(() => this.actions$.pipe(
    ofType(actions.getPage),
    switchMap((action => this.service.getPage(action.request).pipe(
      map(responce => actions.getPageSuccess({ response : responce })),
      catchError(data => {
        return of(setErrorMessage(data.error.error))
      })
    )))
  ));

  addPrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addPrintingEdition),
    switchMap(action => this.service.addPrintingEdition(action.printingEdition)
    .pipe(
      map(printingEdition => actions.addPrintingEditionSuccess({ added: printingEdition })),
      catchError(data => {
        return of(setErrorMessage(data.error.error))
      })
    )
  )))

  updatePrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(actions.updatePrintingEdition),
    switchMap(action => this.service.updatePrintingEdition(action.printingEdition)
    .pipe(
      map(printingEdition => actions.updatePrintingEditionSuccess({
          updated: {
            id: printingEdition.id,
            changes: printingEdition
          }}
      )),
      catchError(data => {
        return of(setErrorMessage(data.error.error))
      })
    ))
  ))

  deletePrintingEdition$ = createEffect(() => this.actions$.pipe(
    ofType(actions.deletePrintingEdition),
    switchMap(printingEdition => this.service.deletePrintingEdition(printingEdition.id)
    .pipe(
      map(id => {
        return actions.deletePrintingEditionSuccess({ id : id })      
      }),
      catchError(data => {
        return of(setErrorMessage(data.error.error))
      })
    )
  )))

}