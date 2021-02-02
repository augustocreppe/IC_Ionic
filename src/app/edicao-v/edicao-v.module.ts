import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdicaoVPageRoutingModule } from './edicao-v-routing.module';

import { EdicaoVPage } from './edicao-v.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicaoVPageRoutingModule
  ],
  declarations: [EdicaoVPage]
})
export class EdicaoVPageModule {}
