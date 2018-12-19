// Core Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { ErrorRoutingModule } from './error.routing';

// Components
import { ErrorComponent } from './error.component';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule,
    SharedModule
  ],
  declarations: [
    ErrorComponent
  ],
  providers: []
})
export class ErrorModule {}


