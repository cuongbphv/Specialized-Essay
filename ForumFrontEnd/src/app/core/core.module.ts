import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors';
import {CookieService} from 'ngx-cookie-service';

import {
  ApiService,
  AuthBaseService,
  DataService,
  FileService,
  GoogleChartsBaseService,
  GooglePieChartService,
  SecurityService,
  SessionService,
  TranslateService
} from './services';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    ApiService,
    AuthBaseService,
    DataService,
    FileService,
    GoogleChartsBaseService,
    GooglePieChartService,
    SecurityService,
    SessionService,
    TranslateService,
    CookieService
  ],
  declarations: []
})
export class CoreModule { }
