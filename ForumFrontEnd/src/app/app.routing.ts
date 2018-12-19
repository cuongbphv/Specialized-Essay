import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {ErrorComponent} from './modules/error/error.component';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: './modules/profile/profile.module#ProfileModule'
  },
  {
    path: 'post',
    loadChildren: './modules/post/post.module#PostModule'
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
