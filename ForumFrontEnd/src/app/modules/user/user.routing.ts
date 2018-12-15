import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {GetStartedComponent} from './get-started/get-started.component';

export const routes: Routes = [
  {
    path: 'get-started',
    component: GetStartedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
