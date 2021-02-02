import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdicaoPPageRoutingModule } from './edicao-p-routing.module';

import { EdicaoPPage } from './edicao-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicaoPPageRoutingModule
  ],
  declarations: [EdicaoPPage]
})
export class EdicaoPPageModule {}
