// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { PostRoutingModule } from './post.routing';

import { LMarkdownEditorModule } from 'ngx-markdown-editor';

// Components
import { CreatePostComponent } from './create/create-post.component';
import { PostDetailComponent } from './detail/post-detail.component';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    LMarkdownEditorModule
  ],
  declarations: [
    CreatePostComponent,
    PostDetailComponent
  ],
  providers: []
})
export class PostModule {}


