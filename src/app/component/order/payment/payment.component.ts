import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy,  ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Constants } from 'src/app/constants/constants';
import { Order } from 'src/app/models/order/order-model';
import { AccountState } from 'src/app/store/account/account.reducer';
import { getEmail } from 'src/app/store/account/account.selectors';
import { payOrder } from 'src/app/store/order/order.actions';
import { OrderState } from 'src/app/store/order/order.reducer';
import { getOrder } from '../../../store/order/order.selectors';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnDestroy, AfterViewInit 
{
  @ViewChild('cardInfo') cardInfo: ElementRef;
      order: Order
      totalCost: number;
      card: any;
      cardHandler = this.onChange.bind(this);
      cardError: string;

    currentEmail : string;
    
    readonly cardElement ='card';
    readonly change = 'change';

    readonly roundTo = Constants.ROUND_TO;

  constructor(
    private cd: ChangeDetectorRef,
    private dialogRef: MatDialogRef<PaymentComponent>,
    private store : Store<OrderState>,
    private accountStore: Store<AccountState>
    ){

    store.pipe(select(getEmail)).subscribe(
        email => {
          this.currentEmail = email
        }
    );
    store.pipe(select(getOrder)).subscribe(
        order => {
        this.order = order
        }
    );

    this.totalCost = this.order.totalCost;
  }

    ngOnDestroy() 
    {
        if (this.card) 
        {
            this.card.removeEventListener(this.change, this.cardHandler);
            this.card.destroy();
        }
    }

    ngAfterViewInit() 
    {
        this.initiateCardElement();
    }

    initiateCardElement() 
    {
        const cardStyle = {
            base: {
                color: '#32325d',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        };

        this.card = elements.create(this.cardElement, { hidePostalCode: true, style: cardStyle });
        this.card.mount(this.cardInfo.nativeElement);
        this.card.addEventListener(this.change, this.cardHandler);
    }

    onChange(error) 
    {
        if (error) 
        {
            this.cardError = error.message;
        } 
        else 
        {
            this.cardError = null;
        }

        this.cd.detectChanges();
    }

    async createStripeToken() 
    {
        const { token, error } = await stripe.createToken(this.card);
        
        if (token) 
        {
            this.store.dispatch(payOrder({ token: token.id, order: this.order}))
            this.dialogRef.close()
        } 
        else 
        {
            this.onError(error);
        }
    }

    onError(error) 
    {
        if (error.message) 
        {
            this.cardError = error.message;
        }
    }

}
