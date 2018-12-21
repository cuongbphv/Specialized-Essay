import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminLayoutComponent} from '../../_layout/admin-layout/admin-layout.component';

export const routes: Routes = [

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
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
      },
      {
        path: 'tag',
        loadChildren: './manage-tag/manage-tag.module#ManageTagModule'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
