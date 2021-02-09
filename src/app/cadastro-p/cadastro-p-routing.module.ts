import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroPPage } from './cadastro-p.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CadastroPPageRoutingModule {}
