import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdicaoVPage } from './edicao-v.page';

const routes: Routes = [
  {
    path: '',
    component: EdicaoVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdicaoVPageRoutingModule {}
