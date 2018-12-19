import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'post',
    loadChildren: './manage-post/manage-post.module#ManagePostModule'
  },
  {
    path: 'user',
    loadChildren: './manage-user/manage-user.module#ManageUserModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
