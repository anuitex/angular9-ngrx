import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  user: User;

  userForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    isBlocked: new FormControl(null)
  });

  constructor() { }

  initinalizeForm() 
  {
    this.userForm.setValue({
      id: null,
      name: '',
      surname: '',
      username: '',
      email: '',
      password: null,
      isBlocked: null
    });
  }

  populateForm(user: User) 
  {
    this.user = user;

    this.userForm.setValue({
      id: user.id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      password: null,
      isBlocked: user.isBlocked
    });
  }

  formValue() 
  {
    return {
      id: this.id.value,
      name: this.name.value,
      surname: this.surname.value,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value
    }
  }

  get id() 
  {
    return this.userForm.get('id') as FormControl;
  }

  get name() 
  {
    return this.userForm.get('name') as FormControl;
  }

  get username() 
  {
    return this.userForm.get('username') as FormControl;
  }

  get surname() 
  {
    return this.userForm.get('surname') as FormControl;
  }

  get email() 
  {
    return this.userForm.get('email') as FormControl;
  }

  get password() 
  {
    return this.userForm.get('password') as FormControl;
  }
}