import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdicaoPPage } from './edicao-p.page';

const routes: Routes = [
  {
    path: '',
    component: EdicaoPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicaoPPageRoutingModule {}
