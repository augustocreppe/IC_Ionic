import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EdicaoPPageRoutingModule } from './edicao-p-routing.module';
import { EdicaoPPage } from './edicao-p.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicaoPPageRoutingModule,
    ReactiveFormsModule,
    BrMaskerModule
  ],
  declarations: [EdicaoPPage]
})

export class EdicaoPPageModule {}
