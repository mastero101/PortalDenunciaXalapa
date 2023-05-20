import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Form3PageRoutingModule } from './form3-routing.module';

import { Form3Page } from './form3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Form3PageRoutingModule
  ],
  declarations: [Form3Page]
})
export class Form3PageModule {}
