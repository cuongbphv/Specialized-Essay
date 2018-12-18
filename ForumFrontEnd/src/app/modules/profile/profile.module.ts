// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile.routing';

// Components
import { ProfileComponent } from './profile.component';
import { PieChartComponent } from './pie-chart/piechart.component';
import {GooglePieChartService, ProfilesService} from '../../core/services';
import {SharedModule} from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
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


