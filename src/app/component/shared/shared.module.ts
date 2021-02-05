import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/modules/shared/material.module";
import { PipesModule } from "src/app/modules/shared/pipes.module";
import { IvyCarouselModule } from "angular-responsive-carousel";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [],
    imports: [
      RouterModule,
      MaterialModule,
      PipesModule.forRoot(),
      FormsModule,
      CommonModule,
      IvyCarouselModule
    ],
    exports: [
    ]
  })
  export class SharedModule { }