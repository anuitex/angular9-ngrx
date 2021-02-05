import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AccountState } from '../../../store/account/account.reducer';
import { signOut } from '../../../store/account/account.actions';
import { getEmail, getIsAuthenticated, getRole } from '../../../store/account/account.selectors';
import { CheckoutComponent } from '../../order/checkout/checkout.component';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  isAdmin: boolean;

  count: number;

  constructor(
    private store: Store<AccountState>,
    private router: Router,
    private dialog: MatDialog,
    private cart: CartService
  ) {}

  ngOnInit(): void 
  {
    this.store.select(getRole).subscribe(
      (data) => {
          this.isAdmin = data == 'Admin'
      }
    );
    this.store.select(getIsAuthenticated).subscribe(
      (status) => {
        this.isAuthenticated = status
      }
    );
  }

  signOut() 
  {
    let email: string;
   
    this.store.pipe(select(getEmail)).subscribe(data => email = data);
    this.store.dispatch(signOut({ email : email }));
    this.router.navigate(['/']);
    this.cart.clean();
  }

  openShopCart() 
  {
    let config: MatDialogConfig = {
      width: "70%"
    };

    this.dialog.open(CheckoutComponent, config);
  }
}
