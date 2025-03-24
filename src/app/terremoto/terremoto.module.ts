import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerremotoPageRoutingModule } from './terremoto-routing.module';

import { TerremotoPage } from './terremoto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerremotoPageRoutingModule
  ],
  declarations: [TerremotoPage]
})
export class TerremotoPageModule {}
