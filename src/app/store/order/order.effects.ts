import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/internal/operators';
import { PaymentComponent } from "src/app/component/order/payment/payment.component";
import { Constants } from "src/app/constants/constants";
import { OrderService } from "src/app/services/order.service";
import * as actions from 'src/app/store/order/order.actions';
import { getClientOrders } from "src/app/store/order/order.actions";
import { setErrorMessage } from "../shared/shared.actions";
import { OrderState } from "./order.reducer";


@Injectable()
export class OrderEffects{

    constructor(
        private $actions: Actions,
        private orderService: OrderService,
        private dialog: MatDialog,
        private store: Store<OrderState>,
        private toastr: ToastrService
    ) {}

    getOrder$ = createEffect(() => this.$actions.pipe(
        ofType(actions.getOrder),
        switchMap(action => this.orderService.getOrder(action.id)
        .pipe(
            map(order => actions.getOrderSuccess({ order: order })),
            tap(order => localStorage.setItem('order', JSON.stringify(order))),
            catchError(data => {
                return of(setErrorMessage(data.error.error))
            })
        )
    )))

    getOrders$ = createEffect(() => this.$actions.pipe(
        ofType(actions.getOrders),
        switchMap((action) => this.orderService.getOrders(action.request)
        .pipe(
            map(response => actions.getOrdersSuccess({ response : response })),
            catchError(data => {
                return of(setErrorMessage(data.error.error))
            })
        ))
    ))

    getClientOrders = createEffect(() => this.$actions.pipe(
        ofType(actions.getClientOrders),
        switchMap(() => this.orderService.getClientOrders()
        .pipe(
            map(orders => actions.getClientOrdersSuccess({ clientOrders: orders })),
            catchError(data => {
                return of(setErrorMessage(data.error.error))
            })
        )
    )))

    addOrder$ = createEffect(() => this.$actions.pipe(
        ofType(actions.createOrder),
        switchMap(action => this.orderService.createOrder(action.items)
        .pipe(
            map(order => {
                this.toastr.success(Constants.ORDER_ADDED)   
                return actions.createOrderSuccess({ order: order })
            }),
            catchError(data => {
                return of(setErrorMessage(data.error.error))
            })
        ))
    ))

    startPayOrder$ = createEffect(() => this.$actions.pipe(
        ofType(actions.getOrderSuccess),
        tap(() => this.dialog.open(PaymentComponent, { width: "30%" }))
    ), { dispatch: false })

    payOrder$ = createEffect(() => this.$actions.pipe(
        ofType(actions.payOrder),
        switchMap(action => this.orderService.payOrder(action.order, action.token)
        .pipe(
            map(() => actions.payOrderSuccess()),
            catchError(data => {
                return of(setErrorMessage(data.error.error))
            })
        )
    )))

    updateClientOrders$ = createEffect(() => this.$actions.pipe(
        ofType(actions.payOrderSuccess),
        tap(() => this.store.dispatch(getClientOrders()))
    ), { dispatch: false })
}
