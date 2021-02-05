import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from 'src/app/component/order/orders/orders.component';
import { RoleGuardService as RoleGuard } from 'src/app/services/role-guard.service';

const routes: Routes = [
    {
        path:'my/orders',
        component: OrdersComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'Client'
        }
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { } 