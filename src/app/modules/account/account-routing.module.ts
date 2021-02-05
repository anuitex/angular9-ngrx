import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailComponent } from '../../component/account/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from '../../component/account/forgot-password/forgot-password.component';
import { SignInComponent } from '../../component/account/sign-in/sign-in.component';
import { SignUpComponent } from '../../component/account/sign-up/sign-up.component';


const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }