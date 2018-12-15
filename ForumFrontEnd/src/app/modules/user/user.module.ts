import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../../core/services';
import {GetStartedComponent} from './get-started/get-started.component';
import {UserRoutingModule} from './user.routing';

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    CommonModule,
    UserRoutingModule
  ],
  declarations: [
    GetStartedComponent
  ],
  providers: [
    TranslateService
  ]
})
export class UserModule {}
