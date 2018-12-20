// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { HomeRoutingModule } from './home.routing';

// Components
import { HomeComponent } from './home.component';
import {ArticleInteractService, ArticleService, PagerService, ProfilesService, TagService} from '../../core/services';

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
    ArticleService,
    ProfilesService,
    ArticleInteractService,
    PagerService
  ]
})
export class HomeModule {}


