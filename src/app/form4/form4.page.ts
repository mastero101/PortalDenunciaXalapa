import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import axios from 'axios';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.page.html',
  styleUrls: ['./form4.page.scss'],
})
export class Form4Page implements OnInit {
  selectedTab: string = 'tab4';
  envioExitoso: boolean = false;
  ocultarElementos: boolean = false;
  mostrarFolio: boolean = false;
  mostrarElementos: boolean = false;
  folio: number = 0;
  maxFolio: any;

  constructor(private router: Router) {
    this.obtenerFolio();
  }

  ngOnInit() {
  }

  obtenerFolio() {
    axios.get('https://nodemysql12.duckdns.org:3001/folio')
      .then(response => {
        this.maxFolio = response.data.maxFolio;
        const ultimoNumero = Number(this.maxFolio);
        this.folio = ultimoNumero;
        console.log('Ultimo Folio:', ultimoNumero);
      })
      .catch(error => {
        console.error('Error al obtener el último folio', error);
      });
  }

  onTabChange(event: any) {
    // Lógica para cambiar el contenido según la pestaña seleccionada
    this.selectedTab = event.detail.value;
  }

  navigateTo(tab: string) {
    this.selectedTab = 'tab4';
    this.router.navigateByUrl('' + tab); // Reemplaza '/form1/' por la ruta correspondiente a tu vista dentro de form1
  }

  enviarDenuncia() {
    const data = {
      folio: this.folio,
      estado: "Activo",
      seguimiento: "En espera de aprobacion" ,
    };
    
  
    // Realiza la solicitud POST utilizando Axios
    axios.post('https://nodemysql12.duckdns.org:3001/seguimiento', data)
      .then((response) => {
        // Maneja la respuesta exitosa de la inserción en la base de datos
        console.log('Datos guardados exitosamente:', response.data);
      })
      .catch((error) => {
        // Maneja el error en caso de que la inserción falle
        console.error('Error al guardar los datos:', error);
        // Puedes mostrar un mensaje de error al usuario o realizar acciones adicionales según tus necesidades
      });

    // Una vez que se confirma el envío, se establece la variable envioExitoso como verdadera
    this.envioExitoso = true;
    this.ocultarElementos = true;
  }

  noEnviar(){
    this.router.navigate(['/form3']);
    this.envioExitoso = false;
  }

  realizarOtraDenuncia(){
    this.router.navigate(['/form1']);
  }

  irAInicio(){
    this.router.navigate(['/']);
  }

  verFolio(){
    this.mostrarFolio = true;
    this.mostrarElementos = true;
  }
}
