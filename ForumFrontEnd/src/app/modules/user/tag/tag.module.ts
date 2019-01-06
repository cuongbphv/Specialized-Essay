// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared';

import { LMarkdownEditorModule } from 'ngx-markdown-editor';
import { NgxSpinnerModule } from 'ngx-spinner';

// Components
import { TagDetailComponent } from './detail/tag-detail.component';


import {
  ArticleInteractService,
  ArticleService,
  CustomToastrService,
  ProfilesService, TagService
} from '../../../core/services';
import {TagRoutingModule} from './tag.routing';
import {TagListComponent} from './list/tag-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    TagRoutingModule,
    SharedModule,
    LMarkdownEditorModule,
    NgxSpinnerModule,
    NgbModule
  ],
  declarations: [
    TagDetailComponent,
    TagListComponent
  ],
  providers: [
    ArticleService,
    ArticleInteractService,
    CustomToastrService,
    ProfilesService,
    TagService,
    CustomToastrService,
    ProfilesService
  ]
})

export class TagModule {}


