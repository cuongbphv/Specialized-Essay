import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {ListPostComponent} from './list-post/list-post.component';
import {DetailPostComponent} from './detail/detail-post.component';
import {ListUnapprovedPostComponent} from './list-unapproved-post/list-unapproved-post.component';
import {ListReportedPostComponent} from './list-reported-post/list-reported-post.component';

export const routes: Routes = [
  {
    path: 'list',
    component: ListPostComponent
  },
  {
    path: 'unapproved',
    component: ListUnapprovedPostComponent
  },
  {
    path: 'reported',
    component: ListReportedPostComponent
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
