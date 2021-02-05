import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService as RoleGuard }  from 'src/app/services/role-guard.service';
import { UserListComponent } from '../../component/administrator/user/user-list/user-list.component';
import { AuthorListComponent } from '../../component/administrator/author/author-list/author-list.component';
import { PrintingEditionListComponent } from 'src/app/component/administrator/printing-edition/printing-edition-list/printing-edition-list.component';
import { OrdersComponent } from 'src/app/component/administrator/order/orders.component';

const routes: Routes = [
    {   
        path: 'authors', 
        component: AuthorListComponent, 
        canActivate: [RoleGuard],
        data: { expectedRole: 'Admin'}
    },
    { 
        path: 'users', 
        component: UserListComponent ,
        canActivate: [RoleGuard],
        data: { expectedRole: 'Admin'}
    },
    { 
      path: 'printing-editions/list', 
      component: PrintingEditionListComponent ,
      canActivate: [RoleGuard],
      data: { expectedRole: 'Admin'}
    },
    {
      path: 'orders',
      component: OrdersComponent,
      canActivate: [RoleGuard],
      data: {
        expectedRole: 'Admin'
      }
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdministratorRoutingModule { }