import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EdicaoVPageRoutingModule } from './edicao-v-routing.module';
import { EdicaoVPage } from './edicao-v.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdicaoVPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EdicaoVPage]
})

export class EdicaoVPageModule {}
