// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/index';
import { PostRoutingModule } from './post.routing';

import { LMarkdownEditorModule } from 'ngx-markdown-editor';

// Components
import { CreatePostComponent } from './create/create-post.component';
import { PostDetailComponent } from './detail/post-detail.component';
import {
  ArticleInteractService,
  ArticleService, CommentService,
  CustomToastrService,
  ModalService,
  ProfilesService,
  ReportArticleService, ReportCommentService
} from '../../../core/services/index';
import {EditPostComponent} from './edit/edit-post.component';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    LMarkdownEditorModule
  ],
  declarations: [
    CreatePostComponent,
    PostDetailComponent,
    EditPostComponent
  ],
  providers: [
    ArticleService,
    ArticleInteractService,
    CustomToastrService,
    ModalService,
    ReportArticleService,
    ReportCommentService,
    ProfilesService,
    CommentService
  ]
})

export class PostModule {}


