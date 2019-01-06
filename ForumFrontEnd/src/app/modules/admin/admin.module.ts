import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '../../shared';
import {AdminRoutingModule} from './admin.routing';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {ConfirmationDialogService} from './confirmation-dialog/confirmation-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  declarations: [
    DashboardComponent,
    ConfirmationDialogComponent
  ],
  providers: [ ConfirmationDialogService ],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class AdminModule { }
