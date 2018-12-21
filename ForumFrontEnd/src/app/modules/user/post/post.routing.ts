import {RouterModule, Routes} from '@angular/router';

import { CreatePostComponent } from './create/create-post.component';
import { PostDetailComponent } from './detail/post-detail.component';
import { NgModule } from '@angular/core';
import {UserGuard} from '../../../core/guards/index';
import {EditPostComponent} from './edit/edit-post.component';

export const routes: Routes = [
  {
    path: 'post/create',
    component: CreatePostComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'post/:id',
    component: PostDetailComponent
  },
  {
    path: 'post/edit/:id',
    component: EditPostComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
