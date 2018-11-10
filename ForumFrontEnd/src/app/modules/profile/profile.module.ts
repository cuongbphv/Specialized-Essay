// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile.routing';

// Components
import { ProfileComponent } from './profile.component';
import { PieChartComponent } from './pie-chart/piechart.component';
import { GooglePieChartService } from '../../core/services';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    PieChartComponent
  ],
  providers: [
    GooglePieChartService
  ]
})
export class ProfileModule {}


