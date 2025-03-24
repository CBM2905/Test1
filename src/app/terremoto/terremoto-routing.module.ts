import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerremotoPage } from './terremoto.page';

const routes: Routes = [
  {
    path: '',
    component: TerremotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerremotoPageRoutingModule {}
