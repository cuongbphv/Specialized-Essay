import {RouterModule, Routes} from '@angular/router';

import { CreatePostComponent } from './create/create-post.component';
import { PostDetailComponent } from './detail/post-detail.component';
import { NgModule } from '@angular/core';
import {UserGuard} from '../../core/guards';
import {EditPostComponent} from './edit/edit-post.component';

export const routes: Routes = [
  {
    path: 'create',
    component: CreatePostComponent,
    canActivate: [UserGuard]
  },
  {
    path: ':id',
    component: PostDetailComponent
  },
  {
    path: 'edit/:id',
    component: EditPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule {}
