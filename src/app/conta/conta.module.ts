import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContaPageRoutingModule } from './conta-routing.module';
import { ContaPage } from './conta.page';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContaPageRoutingModule,
    ImageCropperModule
  ],
  declarations: [ContaPage]
})

export class ContaPageModule {}
