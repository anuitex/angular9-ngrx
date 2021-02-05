import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { confirmEmail } from '../../../store/account/account.actions';
import { AccountState } from '../../../store/account/account.reducer';
import { getIsEmailConfirmed } from '../../../store/account/account.selectors';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  isEmailConfirmed$ = this.store.pipe(select(getIsEmailConfirmed));

  constructor(
    private store: Store<AccountState>, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void 
  {
    let email = this.route.snapshot.queryParamMap.get('email');
    let token = this.route.snapshot.queryParamMap.get('token');

    this.confrimEmail(email, token);
  }

  confrimEmail(email: string, token: string)
  {
    this.store.dispatch(confirmEmail({
      email: email,
      token: token
    }));
  }
}
