import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListPostComponent} from './list-post/list-post.component';
import {ManagePostRouting} from './manage-post.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DetailPostComponent} from './detail/detail-post.component';

@NgModule({
  imports: [
    CommonModule,
    ManagePostRouting,
    NgbModule
  ],
  declarations: [
    ListPostComponent,
    DetailPostComponent
  ]
})
export class ManagePostModule { }
