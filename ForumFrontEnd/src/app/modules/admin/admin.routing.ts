import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminLayoutComponent} from '../../_layout/admin-layout/admin-layout.component';
import {AdminGuard, ModeratorGuard} from '../../core/guards';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'post/list', pathMatch: 'full'},
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
  },

  {
    path: 'moderator',
    component: AdminLayoutComponent,
    canActivate: [ModeratorGuard],
    children: [
      { path: '', redirectTo: 'post/list', pathMatch: 'full'},
      {
        path: 'post',
        loadChildren: './manage-post/manage-post.module#ManagePostModule'
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
