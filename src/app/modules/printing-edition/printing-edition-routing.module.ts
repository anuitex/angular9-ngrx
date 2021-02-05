import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from '../../component/printing-edition/catalog/catalog.component';
import { PrintingEditionComponent } from '../../component/printing-edition/printing-edition/printing-edition.component';

const routes: Routes = [
  { path: 'catalog', component: CatalogComponent },
  { path: 'get/:id', component: PrintingEditionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintingEditionRoutingModule { }