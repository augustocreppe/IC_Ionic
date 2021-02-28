import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPPage } from './search-p.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPPageRoutingModule {}
