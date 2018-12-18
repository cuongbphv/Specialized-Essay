import {RouterModule, Routes} from '@angular/router';

import { ProfileComponent } from './profile.component';
import {NgModule} from '@angular/core';
import {UserGuard} from '../../core/guards';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [UserGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
