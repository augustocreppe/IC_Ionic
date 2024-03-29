import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CadastroVPageRoutingModule } from './cadastro-v-routing.module';
import { CadastroVPage } from './cadastro-v.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroVPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CadastroVPage]
})

export class CadastroVPageModule {}
