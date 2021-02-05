import { NgModule } from "@angular/core";
import { EditionPipe } from "src/app/pipes/edition-type.pipe";
import { StatusPipe } from "src/app/pipes/order-status.pipe";
import { CurrencyPipe } from "../../pipes/currency.pipe";

@NgModule({
  imports: [],
  exports: [
      CurrencyPipe,
      EditionPipe,
      StatusPipe
  ],
  declarations: [
      CurrencyPipe,
      EditionPipe,
      StatusPipe
   ]
})
export class PipesModule {
  static forRoot(){
    return{
      ngModule: PipesModule,
      providers: []
    }
  }
 }