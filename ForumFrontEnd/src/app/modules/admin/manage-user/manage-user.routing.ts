import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {ListUserComponent} from './list-user/list-user.component';


export const routes: Routes = [
  {
    path: 'list',
    component: ListUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUserRouting {}
