import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PrintingEdition } from 'src/app/models/printing-edition/printing-edition.model';
import { CartService } from 'src/app/services/cart.service';
import { getPrintingEdition } from '../../../store/printing-edition/printing-edition.actions';
import { PrintingEditionState } from '../../../store/printing-edition/printing-edition.reducer';
import * as selectors from '../../../store/printing-edition/printing-edition.selectors'
import { AccountState } from 'src/app/store/account/account.reducer';
import { getIsAuthenticated, getRole } from 'src/app/store/account/account.selectors';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-printing-edition',
  templateUrl: './printing-edition.component.html',
  styleUrls: ['./printing-edition.component.scss']
})
export class PrintingEditionComponent implements OnInit {

  readonly roundTo = Constants.ROUND_TO;
  
  id: string;

  printingEdition: PrintingEdition;
  quantity: number = Constants.DEFAULT_QUANTITY;

  isLoggedIn: boolean;
  isAdmin: boolean;

  private subscription: Subscription;

  constructor(
    private activeRoute: ActivatedRoute,
    private store$: Store<PrintingEditionState>,
    private accountStore$: Store<AccountState>,
    private cart: CartService,
    private toastr: ToastrService
  ) {
      this.subscription = this.activeRoute.params.subscribe(params => this.id = params['id']);
    }

  ngOnInit(): void 
  {
    this.store$.dispatch(getPrintingEdition({ id: this.id }));
    this.store$.pipe(select(selectors.getPrintingEdition)).subscribe(
      data => {
        this.printingEdition = data
      }
    );

    this.accountStore$.pipe(select(getIsAuthenticated)).subscribe(
      data => {
        this.isLoggedIn = data
      }
    );
    this.accountStore$.pipe(select(getRole)).subscribe(
      data => {
        this.isAdmin = data === Constants.ADMIN
      }
    );
  }

  addProduct()
  {
    this.cart.add(this.printingEdition, this.quantity);

    this.toastr.success(`${this.printingEdition.title} ${Constants.ADDED_TO_CART_MESSAGE}`);
  }
}
