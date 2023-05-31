import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  captchaVerified: boolean = false;
  folio_input: string = "";

  constructor(private platform: Platform, private router: Router) {}

  buscar() {
    if (this.captchaVerified) {
      console.log('Captcha Works');

      // Almacenar el valor en localStorage
      this.platform.ready().then(() => {
        window.localStorage.setItem('folio_input', this.folio_input);
      });

      this.router.navigate(['/tabs/tab3']);
    } else {
      console.log('Captcha verification failed');
      console.log(this.folio_input);
      this.platform.ready().then(() => {
        window.localStorage.setItem('folio_input', this.folio_input);
      });
    }
  }
  
    onVerify(token: string) {
      // The verification process was successful.
      // You can verify the token on your server now.
      this.captchaVerified = true;
  }

  onExpired(response: any) {
      // The verification expired.
  }
  
  onError(error: any) {
      // An error occured during the verification process.
  }
}
