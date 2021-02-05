import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [  
  { path: 'my', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) }, 
  { path: 'printing-editions', loadChildren: () => import('./modules/printing-edition/printing-edition.module').then(m => m.PrintingEditionModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
