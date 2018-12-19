import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListUserComponent} from './list-user/list-user.component';
import {ManageUserRouting} from './manage-user.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ManageUserRouting,
    NgbModule
  ],
  declarations: [
    ListUserComponent
  ]
})
export class ManageUserModule { }
