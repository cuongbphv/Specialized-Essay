// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { HomeRoutingModule } from './home.routing';

// Components
import { HomeComponent } from './home.component';
import {ArticleService, TagService} from '../../core/services';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    TagService,
    ArticleService
  ]
})
export class HomeModule {}


