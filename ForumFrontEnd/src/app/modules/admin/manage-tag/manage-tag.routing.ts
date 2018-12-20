import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {ListTagComponent} from './list-tag/list-tag.component';
import {DetailTagComponent} from './detail/detail-tag.component';

export const routes: Routes = [
  {
    path: 'list',
    component: ListTagComponent
  },
  {
    path: ':id',
    component: DetailTagComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageTagRouting {}
