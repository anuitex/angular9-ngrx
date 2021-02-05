import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EditUserModel } from 'src/app/models/user/edit-user.model';
import { UserFormService } from 'src/app/services/form-services/user-form.service';
import { updateUser } from 'src/app/store/user/user.actions';
import { UserState } from 'src/app/store/user/user.reducer';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  
  constructor(
    public formService: UserFormService,
    private dialog: MatDialogRef<UserItemComponent>,
    private store: Store<UserState>
  ) { }
  
  ngOnInit(): void 
  {
  }

  onSubmit()
  {
    if (this.formService.userForm.valid)
    {
      let user: EditUserModel = this.formService.formValue();
      this.store.dispatch(updateUser({ user: user }));
      this.onClose();
    }
  }

  onClose()
  {
    this.formService.initinalizeForm();
    this.dialog.close();
  }
}
