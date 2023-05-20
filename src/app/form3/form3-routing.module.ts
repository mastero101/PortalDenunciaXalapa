import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Form3Page } from './form3.page';

const routes: Routes = [
  {
    path: '',
    component: Form3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Form3PageRoutingModule {}
