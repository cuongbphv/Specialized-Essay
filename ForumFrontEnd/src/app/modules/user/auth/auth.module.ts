import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../../shared/index';
import { AuthRoutingModule } from './auth.routing';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../../../core/services/index';
import {RegisterComponent} from './register/register.component';
import {RegisterOldComponent} from './register-old/register-old.component';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    SharedModule,
    CommonModule
  ],
  declarations: [
    RegisterOldComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
  ]
})
export class AuthModule {}
