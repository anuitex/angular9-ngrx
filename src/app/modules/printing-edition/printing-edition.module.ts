import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import {RoleGuardService as RoleGuard, ROLE_GUARD}  from 'src/app/services/role-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogComponent } from '../../component/printing-edition/catalog/catalog.component';
import { PrintingEditionComponent } from '../../component/printing-edition/printing-edition/printing-edition.component';
import { PipesModule } from '../shared/pipes.module';
import { PrintingEditionRoutingModule } from './printing-edition-routing.module';
import { MaterialModule } from '../shared/material.module';
import { StoreModule } from '@ngrx/store';
import { printingEditionReducer, PRINTING_EDITION_REDUCER_NODE } from '../../store/printing-edition/printing-edition.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PrintingEditionEffects } from '../../store/printing-edition/printing-edition.effects';
import { PrintingEditionListComponent } from 'src/app/component/administrator/printing-edition/printing-edition-list/printing-edition-list.component';
import { AddPrintingEditionComponent } from 'src/app/component/administrator/printing-edition/add-printing-edition/add-printing-edition.component';
import { UpdatePrintingEditionComponent } from 'src/app/component/administrator/printing-edition/update-printing-edition/update-printing-edition.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations:  [
    CatalogComponent,
    PrintingEditionComponent,
    PrintingEditionListComponent,
    AddPrintingEditionComponent,
    UpdatePrintingEditionComponent
  ],
  imports: [
    PrintingEditionRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    StoreModule.forFeature(PRINTING_EDITION_REDUCER_NODE, printingEditionReducer),
    EffectsModule.forFeature([PrintingEditionEffects]),
    
    PipesModule.forRoot(),

    NgxSliderModule,
    MaterialModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: ROLE_GUARD,
      useClass: RoleGuard,
    }
  ]
})
export class PrintingEditionModule { }