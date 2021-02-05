import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from 'src/app/component/order/orders/orders.component';
import { PaymentComponent } from 'src/app/component/order/payment/payment.component';
import { ROLE_GUARD, RoleGuardService as RoleGuard } from 'src/app/services/role-guard.service';
import { PipesModule } from '../shared/pipes.module';
import { CheckoutComponent } from 'src/app/component/order/checkout/checkout.component';
import { MaterialModule } from '../shared/material.module';
import { OrderRoutingModule } from './order-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from 'src/app/store/order/order.effects';
import { orderReducer, ORDER_REDUCER_NODE } from 'src/app/store/order/order.reducer';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    OrdersComponent,
    CheckoutComponent,
    PaymentComponent
  ],
  imports: [
    OrderRoutingModule,
    CommonModule,
    PipesModule.forRoot(),
    FormsModule,
    
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule,

    StoreModule.forFeature(ORDER_REDUCER_NODE, orderReducer),
    EffectsModule.forFeature([OrderEffects])
  ],
  providers: [
    {
      provide: ROLE_GUARD,
      useClass: RoleGuard,
    }
  ],
  entryComponents: [
    CheckoutComponent, 
    PaymentComponent
  ]
})
export class OrderModule { }
