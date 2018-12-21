// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SharedModule } from '../../../shared/index';
import { HomeRoutingModule } from './home.routing';

// Components
import { HomeComponent } from './home.component';
import {ArticleInteractService, ArticleService, ProfilesService, TagService} from '../../core/services';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgbModule,
    NgxSpinnerModule
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


