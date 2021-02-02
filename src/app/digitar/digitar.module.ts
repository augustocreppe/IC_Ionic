import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DigitarPageRoutingModule } from './digitar-routing.module';
import { DigitarPage } from './digitar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigitarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DigitarPage]
})

export class DigitarPageModule {}
