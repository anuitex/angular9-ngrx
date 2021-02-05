import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { UserState } from 'src/app/store/user/user.reducer';
import { getCurrentUser } from 'src/app/store/user/user.selectors';
import * as userActions from '../../../store/user/user.actions'
import { AccountState } from '../../../store/account/account.reducer';
import { getId } from '../../../store/account/account.selectors';
import { MatDialog } from '@angular/material/dialog';
import { UserFormService } from 'src/app/services/form-services/user-form.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  user: User;  
  isAdmin: boolean;
  id: string;
  
  user$ = this.store$.pipe(select(getCurrentUser));
  subscription: Subscription;

  constructor(
    private store$: Store<UserState>,
    private accountStore$: Store<AccountState>,
    private route: ActivatedRoute,
    private formService: UserFormService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void 
  {
    this.accountStore$.pipe(select(getId)).subscribe(
      data => { 
        this.id = data;
    });

    this.store$.dispatch(userActions.getUser({ id: this.id }));
  }

  edit() 
  {
    this.store$.pipe(select(getCurrentUser)).subscribe(
      data => { 
        this.user = data;
      }
    );

    this.formService.populateForm(this.user);
    this.dialog.open(UpdateProfileComponent);
  }
}
