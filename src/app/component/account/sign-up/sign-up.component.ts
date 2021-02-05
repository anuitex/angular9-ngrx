import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getErrorMessage } from 'src/app/store/shared/shared.selectors';
import { singUp } from '../../../store/account/account.actions';
import { getIsSignedUp } from '../../../store/account/account.selectors';
 
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  isSignedUp$ = this.store.pipe(select(getIsSignedUp))
  errorMessage$ = this.store.pipe(select(getErrorMessage))

  signUpForm: FormGroup;
  formSubmited: boolean;

  constructor(
    private fb: FormBuilder,
    private store : Store,
    private router: Router
    ) { }

  ngOnInit(): void 
  {
    this.initForm();
  }

  initForm()
  {
    this.signUpForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]]
     });
  }

  signUp()
  {
    if (this.signUpForm.valid)
    {
      this.store.dispatch(singUp({
        name: this.name.value,
        surname: this.surname.value,
        username: this.username.value,
        email: this.email.value,
        password: this.password.value
      }));
    }
  }

  get name()
  {
    return this.signUpForm.get('name') as FormControl;
  }

  get surname()
  {
    return this.signUpForm.get('surname') as FormControl;
  }

  get username()
  {
    return this.signUpForm.get('username') as FormControl;
  }

  get email()
  {
    return this.signUpForm.get('email') as FormControl;
  }

  get password()
  {
    return this.signUpForm.get('password') as FormControl;
  }
}
