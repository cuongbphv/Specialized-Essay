import {RouterModule, Routes} from '@angular/router';

import { ErrorComponent } from './error.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: 'error',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule {}
