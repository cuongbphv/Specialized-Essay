import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {ProfileComponent} from './profile/profile.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];
