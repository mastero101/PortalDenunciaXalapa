import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Form4Page } from './form4.page';

const routes: Routes = [
  {
    path: '',
    component: Form4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Form4PageRoutingModule {}
