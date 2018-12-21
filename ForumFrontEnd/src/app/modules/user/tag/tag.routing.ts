import {RouterModule, Routes} from '@angular/router';

import { NgModule } from '@angular/core';
import {TagDetailComponent} from './detail/tag-detail.component';
import {TagListComponent} from './list/tag-list.component';

export const routes: Routes = [
  {
    path: 'tag/list',
    component: TagListComponent
  },
  {
    path: 'tag/:id',
    component: TagDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule {}
