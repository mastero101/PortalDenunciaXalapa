import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    IonicStorageModule.forRoot(),
    NgHcaptchaModule.forRoot({
      siteKey: '6a33385b-0a79-4d19-8b85-f77fac596c05',
      languageCode: 'es' // optional, will default to browser language
    }),
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
