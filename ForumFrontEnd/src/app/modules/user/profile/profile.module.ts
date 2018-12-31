// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile.routing';

// Components
import { ProfileComponent } from './profile.component';
import { PieChartComponent } from './pie-chart/piechart.component';
import {GooglePieChartService, ProfilesService} from '../../../core/services/index';
import {SharedModule} from '../../../shared/index';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgbModule,
    NgxSpinnerModule
  ],
  declarations: [
    ProfileComponent,
    PieChartComponent
  ],
  providers: [
    GooglePieChartService,
    ProfilesService
  ]
})
export class ProfileModule {}


