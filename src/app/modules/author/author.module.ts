import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AuthorListComponent } from "../../component/administrator/author/author-list/author-list.component";
import { UserRoutingModule } from "../user/user-routing.module";
import { AuthorEffects } from "../../store/author/author.effects";
import { authorReducer, AUTHOR_REDUCER_NODE } from "../../store/author/author.reducer";
import { MaterialModule } from "../shared/material.module";
import { AddAuthorComponent } from "src/app/component/administrator/author/add-author/add-author.component";
import { UpdateAuthorComponent } from "src/app/component/administrator/author/update-author/update-author.component";

@NgModule({
    declarations: [
      AddAuthorComponent,
      UpdateAuthorComponent,
      AuthorListComponent
    ],
    imports: [
      UserRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      MaterialModule,
      StoreModule.forFeature(AUTHOR_REDUCER_NODE, authorReducer),
      EffectsModule.forFeature([AuthorEffects])
    ],
    exports:[
    ]
  })
  export class AuthorModule { }