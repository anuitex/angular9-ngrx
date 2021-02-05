import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getErrorMessage } from 'src/app/store/shared/shared.selectors';
import { forgotPassword } from '../../../store/account/account.actions';
import { AccountState } from '../../../store/account/account.reducer';
import { getIsPasswordForgot } from '../../../store/account/account.selectors';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  authMessage$ = this.store.pipe(select(getErrorMessage))
  isForgotPassword$ = this.store.pipe(select(getIsPasswordForgot))

  forgotPasswordForm: FormGroup

  constructor(
    public store: Store<AccountState>, 
    private fb: FormBuilder, 
    private router: Router
    ) { }

  ngOnInit(): void 
  {
    this.initForm();  
  }

  initForm() 
  {
    this.forgotPasswordForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }

  forgotPassword()
  {
    if (this.forgotPasswordForm.valid)
    {
      this.store.dispatch(forgotPassword({ email: this.email.value }));
    }
  }

  get email()
  {
    return this.forgotPasswordForm.get('email') as FormGroup;
  }
}
