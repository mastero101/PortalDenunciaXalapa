import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  folioNumber: number = 0;
  status: string;
  trackingStatus: string;
  maxFolio: any;
  folioInput: any;

  constructor() {
    this.obtenerFolio();
    this.status = 'Activo';
    this.trackingStatus = 'En espera de aprobación';
    this.obtenerFolio_Local();
    this.obtenerDatos();
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

  obtenerFolio_Local() {
    this.folioInput = window.localStorage.getItem('folio_input');
    console.log('Folio local:', this.folioInput);
  }

  obtenerDatos(){
    axios.get(`http://20.172.167.237:3000/estado/${this.folioInput}`)
    .then(response => {
      const estado = response.data;
      // Hacer lo que necesites con el estado obtenido
      console.log(estado);
    })
    .catch(error => {
      console.error('Error al obtener el estado:', error);
      // Manejar el error de acuerdo a tus necesidades
    });
  }

}
