import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroVPage } from './cadastro-v.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CadastroVPageRoutingModule {}
