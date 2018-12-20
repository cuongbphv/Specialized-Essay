import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListUserComponent} from './list-user/list-user.component';
import {ManageUserRouting} from './manage-user.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DetailUserComponent} from './detail/detail-user.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ManageUserRouting,
    FormsModule,
    NgbModule
  ],
  declarations: [
    ListUserComponent,
    DetailUserComponent
  ]
})
export class ManageUserModule { }
