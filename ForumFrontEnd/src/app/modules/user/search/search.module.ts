// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SharedModule } from '../../../shared';
import { SearchRoutingModule } from './search.routing';

// Components
import { SearchComponent } from './search.component';
import {ArticleInteractService, ArticleService, ProfilesService, TagService} from '../../../core/services';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    NgbModule,
    NgxSpinnerModule
  ],
  declarations: [
    SearchComponent
  ],
  providers: [
  ]
})
export class SearchModule {}


