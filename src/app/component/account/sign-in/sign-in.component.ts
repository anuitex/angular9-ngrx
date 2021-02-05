import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { signIn } from '../../../store/account/account.actions';
import { Router } from '@angular/router';
import { AccountState } from '../../../store/account/account.reducer';
import { getIsAuthenticated } from 'src/app/store/account/account.selectors';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup
  formSubmited: boolean
  
  isLoggedIn = this.store.pipe(select(getIsAuthenticated)).subscribe(
    data => {
      if(data) {
        this.router.navigateByUrl('/printing-editions/catalog')
      }
    }
  )

  constructor(
    private store: Store<AccountState>,
    private fb: FormBuilder,
    private router: Router
  ) {}
  
  ngOnInit(): void 
  {
    this.initForm();
  }

  initForm() 
  {
    this.signInForm = this.fb.group({
     email: ["", [Validators.email, Validators.required]],
     password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  signIn() 
  {
    this.formSubmited = true;
    
    if (this.signInForm.valid) 
    {
      this.store.dispatch(signIn({
        email: this.email.value,
        password: this.password.value
      }));
    }
  }

  get email() 
  {
    return this.signInForm.get('email') as FormGroup;
  }

  get password() 
  {
    return this.signInForm.get('password') as FormGroup;
  }
}