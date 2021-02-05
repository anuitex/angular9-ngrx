import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from 'src/app/modules/account/account-routing.module';
import { SignInComponent } from '../../component/account/sign-in/sign-in.component';
import { SignUpComponent } from '../../component/account/sign-up/sign-up.component';
import { ConfirmEmailComponent } from '../../component/account/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from '../../component/account/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from '../../store/account/account.effects';
import { accountReducer, ACCOUNT_REDUCER_NODE } from '../../store/account/account.reducer';


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    ForgotPasswordComponent,
    ConfirmEmailComponent
  ],
  imports: [
    AccountRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    StoreModule.forFeature(ACCOUNT_REDUCER_NODE, accountReducer),
    EffectsModule.forFeature([AccountEffects])
  ],
  exports:[
  ]
})
export class AccountModule { }
