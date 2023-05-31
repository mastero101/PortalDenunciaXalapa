import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  folioNumber: number = 0;
  status: string;
  trackingStatus: string;
  maxFolio: any;

  constructor() {
    this.obtenerFolio();
    this.status = 'Activo';
    this.trackingStatus = 'En espera de aprobación';
  }

  obtenerFolio() {
    axios.get('http://20.172.167.237:3000/folio')
      .then(response => {
        this.maxFolio = response.data.maxFolio;
        const ultimoNumero = Number(this.maxFolio);
        this.folioNumber = ultimoNumero;
        console.log('Ultimo Folio:', ultimoNumero);
      })
      .catch(error => {
        console.error('Error al obtener el último folio', error);
      });
  }

}
