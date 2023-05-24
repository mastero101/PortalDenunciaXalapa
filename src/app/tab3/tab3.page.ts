import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  folioNumber: number;
  status: string;
  trackingStatus: string;

  constructor() {
    this.folioNumber = 3858719;
    this.status = 'Activo';
    this.trackingStatus = 'En espera de aprobación';
  }

}
