import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {ListUserComponent} from './list-user/list-user.component';
import {DetailUserComponent} from './detail/detail-user.component';


export const routes: Routes = [
  {
    path: '',
    component: ListUserComponent
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
