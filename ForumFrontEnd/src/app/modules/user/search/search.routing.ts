import {RouterModule, Routes} from '@angular/router';

import { SearchComponent } from './search.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {}
