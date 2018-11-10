import { NgModule } from '@angular/core';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared';
import { AuthRoutingModule } from './auth.routing';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../../core/services';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    BrowserModule,
    CommonModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    TranslateService
  ]
})
export class AuthModule {}
