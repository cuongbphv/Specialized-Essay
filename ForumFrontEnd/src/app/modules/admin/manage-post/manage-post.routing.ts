import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {ListPostComponent} from './list-post/list-post.component';
import {DetailPostComponent} from './detail/detail-post.component';

export const routes: Routes = [
  {
    path: '',
    component: ListPostComponent
  },
  {
    path: ':id',
    component: DetailPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagePostRouting {}
