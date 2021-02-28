import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPPageRoutingModule } from './search-p-routing.module';

import { SearchPPage } from './search-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPPageRoutingModule
  ],
  declarations: [SearchPPage]
})
export class SearchPPageModule {}
