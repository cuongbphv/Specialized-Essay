import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListPostComponent} from './list-post/list-post.component';
import {ManagePostRouting} from './manage-post.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DetailPostComponent} from './detail/detail-post.component';
import {FormsModule} from '@angular/forms';
import {LMarkdownEditorModule} from 'ngx-markdown-editor';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SharedModule} from '../../../shared';

@NgModule({
  imports: [
    CommonModule,
    ManagePostRouting,
    FormsModule,
    NgbModule,
    SharedModule,
    LMarkdownEditorModule,
    NgxSpinnerModule
  ],
  declarations: [
    ListPostComponent,
    DetailPostComponent
  ]
})
export class ManagePostModule { }
