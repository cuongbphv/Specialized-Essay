import {RouterModule, Routes} from '@angular/router';

import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import {RegisterComponent} from './register/register.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
