import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {ListUserComponent} from './list-user/list-user.component';
import {DetailUserComponent} from './detail/detail-user.component';
import {ListBannedUserComponent} from './list-banned-user/list-banned-user.component';


export const routes: Routes = [
  {
    path: 'list',
    component: ListUserComponent
  },
  {
    path: 'banned',
    component: ListBannedUserComponent
  },
  {
    path: ':id',
    component: DetailUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRouting {}
