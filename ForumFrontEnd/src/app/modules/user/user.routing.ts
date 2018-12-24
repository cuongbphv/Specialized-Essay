import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {UserLayoutComponent} from '../../_layout/user-layout/user-layout.component';

export const routes: Routes = [

  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: '',
        loadChildren: './profile/profile.module#ProfileModule'
      },
      {
        path: '',
        loadChildren: './post/post.module#PostModule'
      },
      {
        path: '',
        loadChildren: './tag/tag.module#TagModule'
      },
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
