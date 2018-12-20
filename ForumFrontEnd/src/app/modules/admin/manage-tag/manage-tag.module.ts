import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ManageTagRouting} from './manage-tag.routing';
import {ListTagComponent} from './list-tag/list-tag.component';
import {DetailTagComponent} from './detail/detail-tag.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ManageTagRouting,
    FormsModule,
    NgbModule
  ],
  declarations: [
    ListTagComponent,
    DetailTagComponent
  ]
})
export class ManageTagModule { }
