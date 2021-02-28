import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchVPageRoutingModule } from './search-v-routing.module';

import { SearchVPage } from './search-v.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchVPageRoutingModule
  ],
  declarations: [SearchVPage]
})
export class SearchVPageModule {}
