import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { UserItemComponent } from "../../component/administrator/user/user-item/user-item.component";
import { UserListComponent } from "../../component/administrator/user/user-list/user-list.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserEffects } from "../../store/user/user.effects";
import { userReducer, USER_REDUCER_NODE } from "../../store/user/user.reducer";
import { MaterialModule } from "../shared/material.module";
import { ProfileComponent } from "src/app/component/user/profile/profile.component";

@NgModule({
    declarations: [
      UserListComponent,
      UserItemComponent,
      ProfileComponent
    ],
    imports: [
      UserRoutingModule,
      ReactiveFormsModule,
      FormsModule,
      CommonModule,
      MaterialModule,
      StoreModule.forFeature(USER_REDUCER_NODE, userReducer),
      EffectsModule.forFeature([UserEffects])
    ],
    exports:[],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class UserModule { }