import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {UserLayoutComponent} from './_layout/user-layout/user-layout.component';
import {AdminLayoutComponent} from './_layout/admin-layout/admin-layout.component';
import {RegisterComponent} from './modules/auth/register/register.component';
import {LoginComponent} from './modules/auth/login/login.component';
import {HomeComponent} from './modules/home/home.component';
import {DashboardComponent} from './modules/admin/dashboard/dashboard.component';

const routes: Routes = [

  //User routes goes here
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'profile',
        loadChildren: './modules/profile/profile.module#ProfileModule'
      },
      {
        path: 'post',
        loadChildren: './modules/post/post.module#PostModule'
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ]
  },

  // Admin routes goes here here
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' },
      {
        path: '',
        loadChildren: './modules/admin/admin.module#AdminModule'
      }
    ]
  },

  // {
  //   //   path: 'profile',
  //   //   loadChildren: './modules/profile/profile.module#ProfileModule'
  //   // },
  //   // {
  //   //   path: 'post',
  //   //   loadChildren: './modules/post/post.module#PostModule'
  //   // },
  //   // {
  //   //   path: 'admin',
  //   //   loadChildren: './modules/admin/admin.module#AdminModule'
  //   // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
