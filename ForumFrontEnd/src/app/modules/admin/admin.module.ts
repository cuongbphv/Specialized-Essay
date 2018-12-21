import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '../../shared';
import {AdminRoutingModule} from './admin.routing';

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
