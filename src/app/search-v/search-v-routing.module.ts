import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchVPage } from './search-v.page';

const routes: Routes = [
  {
    path: '',
    component: SearchVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class SearchVPageRoutingModule {}
