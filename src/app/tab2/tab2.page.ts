import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private router: Router) {}

  buscar(){
    console.log("Captcha Works");
    this.router.navigate(['/tabs/tab3']);
  }
  
    onVerify(token: string) {
      // The verification process was successful.
      // You can verify the token on your server now.
  }

  onExpired(response: any) {
      // The verification expired.
  }
  
  onError(error: any) {
      // An error occured during the verification process.
  }
}
