import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Form4PageRoutingModule } from './form4-routing.module';

import { Form4Page } from './form4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Form4PageRoutingModule
  ],
  declarations: [Form4Page]
})
export class Form4PageModule {}
