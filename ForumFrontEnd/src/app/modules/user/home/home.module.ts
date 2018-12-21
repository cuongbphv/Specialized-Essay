// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/index';
import { HomeRoutingModule } from './home.routing';

// Components
import { HomeComponent } from './home.component';
import {ArticleInteractService, ArticleService, ProfilesService, TagService} from '../../../core/services/index';

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
    ArticleInteractService
  ]
})
export class HomeModule {}


