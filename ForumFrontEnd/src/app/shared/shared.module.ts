import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

import { TranslatePipe } from './pipes/translate.pipe';

import { AdminGuard } from './guard/admin.guard';
import { ModeratorGuard } from './guard/moderator.guard';
import { AuthGuard } from './guard/user.guard';

import { AuthBaseService } from './services/authenticate.service';

import { Util } from './util';
import {Session} from './session';
import {SharedService} from './shared.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    TranslatePipe
  ],
  exports: [
    FormsModule,
    RouterModule,
    TranslatePipe
  ],
  providers: [
    FormBuilder,
    AuthBaseService,
    AdminGuard,
    ModeratorGuard,
    AuthGuard,
    Util
  ]
})
export class SharedModule {}
