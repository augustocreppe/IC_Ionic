import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPPageRoutingModule } from './search-p-routing.module';
import { SearchPPage } from './search-p.page';
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPPageRoutingModule,
    BrMaskerModule
  ],
  declarations: [SearchPPage]
})

export class SearchPPageModule {}
