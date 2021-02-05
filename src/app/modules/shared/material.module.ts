import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule} from '@angular/material/dialog';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import {MatSliderModule} from '@angular/material/slider'

@NgModule({
    declarations: [],
    imports: [
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatListModule,
        MatTableModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatToolbarModule,
        MatSortModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatPaginatorModule,
        NgxMatSelectSearchModule
    ],
    exports:[
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatListModule,
        MatTableModule,
        MatGridListModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatToolbarModule,
        MatSortModule,
        MatSlideToggleModule,
        MatMenuModule,
        MatPaginatorModule,
        NgxMatSelectSearchModule,
        MatSliderModule
    ]
  })
  export class MaterialModule { }