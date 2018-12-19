import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '../../shared';
import {AdminRoutingModule} from './admin.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ManagePostModule} from './manage-post/manage-post.module';
import {ManageUserModule} from './manage-user/manage-user.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class AdminModule { }
