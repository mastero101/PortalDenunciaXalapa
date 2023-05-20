import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Form1Page } from '../form1/form1.page';
import { Form2Page } from './form2.page';
import { Form4Page } from '../form4/form4.page';
import { Form3Page } from '../form3/form3.page';

const routes: Routes = [
  {
    path: '',
    component: Form2Page
  },
  {
    path: 'form1',
    component: Form1Page
  },
  {
    path: 'form3',
    component: Form3Page
  },
  {
    path: 'form4',
    component: Form4Page
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Form2PageRoutingModule {}
