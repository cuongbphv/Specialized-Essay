import {RouterModule, Routes} from '@angular/router';

import { CreatePostComponent } from './create/create-post.component';
import { PostDetailComponent } from './detail/post-detail.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'create',
    component: CreatePostComponent
  },
  {
    path: ':id',
    component: PostDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
