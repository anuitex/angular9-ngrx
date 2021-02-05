import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { RoleGuardService as RoleGuard, ROLE_GUARD } from '../../services/role-guard.service';
import { UserEffects } from '../../store/user/user.effects';
import { userReducer, USER_REDUCER_NODE } from '../../store/user/user.reducer';
import { MaterialModule } from '../shared/material.module';
import { PipesModule } from '../shared/pipes.module';
import { UserItemComponent } from 'src/app/component/administrator/user/user-item/user-item.component';
import { AuthorEffects } from 'src/app/store/author/author.effects';
import { PrintingEditionEffects } from 'src/app/store/printing-edition/printing-edition.effects';
import { printingEditionReducer, PRINTING_EDITION_REDUCER_NODE } from 'src/app/store/printing-edition/printing-edition.reducer';
import { authorReducer, AUTHOR_REDUCER_NODE } from 'src/app/store/author/author.reducer';
import { BrowserModule } from '@angular/platform-browser';
import { AddAuthorComponent } from 'src/app/component/administrator/author/add-author/add-author.component';
import { UpdateAuthorComponent } from 'src/app/component/administrator/author/update-author/update-author.component';
import { AddPrintingEditionComponent } from 'src/app/component/administrator/printing-edition/add-printing-edition/add-printing-edition.component';
import { UpdatePrintingEditionComponent } from 'src/app/component/administrator/printing-edition/update-printing-edition/update-printing-edition.component';
import { OrdersComponent } from 'src/app/component/administrator/order/orders.component';

@NgModule({
    declarations: [
      OrdersComponent
    ],
    imports: [
      CommonModule,
      AdministratorRoutingModule,

      StoreModule.forFeature(USER_REDUCER_NODE, userReducer),
      StoreModule.forFeature(PRINTING_EDITION_REDUCER_NODE, printingEditionReducer),
      StoreModule.forFeature(AUTHOR_REDUCER_NODE, authorReducer),
      EffectsModule.forFeature([UserEffects, PrintingEditionEffects, AuthorEffects]),

      PipesModule.forRoot(),

      MaterialModule,

      BrowserModule,
      FormsModule,
      ReactiveFormsModule
    ],
    exports: [
        MaterialModule
    ],
    providers: [
      {
        provide: ROLE_GUARD,
        useClass: RoleGuard,
      }
    ],
    entryComponents: [
      AddAuthorComponent,
      UpdateAuthorComponent,
      UserItemComponent,
      AddPrintingEditionComponent,
      UpdatePrintingEditionComponent
    ]
  })
  export class AdministratorModule { }