import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  status: string;
  trackingStatus: string;
  maxFolio: any;
  folioInput: any;
  folio: any;
  estado: any;
  seguimiento: any;

  constructor() {
    this.status = 'Activo';
    this.trackingStatus = 'En espera de aprobación';
    this.obtenerFolio_Local();
    this.obtenerDatos();
  }

  obtenerFolio_Local() {
    this.folioInput = window.localStorage.getItem('folio_input');
    console.log('Folio local:', this.folioInput);
  }

  obtenerDatos(){
    axios.get(`https://nodemysql12.duckdns.org:3001/estado/${this.folioInput}`)
    .then(response => {
      this.folio = response.data.folio;
      this.estado = response.data.estado;
      this.seguimiento = response.data.seguimiento;
      // Hacer lo que necesites con el estado obtenido
      console.log(this.folio);
      console.log(this.estado);
      console.log(this.seguimiento);
    })
    .catch(error => {
      console.error('Error al obtener el estado:', error);
      // Manejar el error de acuerdo a tus necesidades
    });
  }

  clearLocal() {
    localStorage.clear();
  }

}
