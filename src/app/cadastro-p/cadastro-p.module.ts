import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CadastroPPageRoutingModule } from './cadastro-p-routing.module';
import { CadastroPPage } from './cadastro-p.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadastroPPageRoutingModule,
    BrMaskerModule
  ],
  declarations: [CadastroPPage]
})

export class CadastroPPageModule {}
