import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import axios from 'axios';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.page.html',
  styleUrls: ['./form2.page.scss'],
})
export class Form2Page implements OnInit {
  selectedTab: string = 'tab2';
  folio: number = 0;
  estados: string[] = [];
  municipios: { [estado: string]: string[] } = {};
  selectedEstado: string = '';
  selectedMunicipio: string | null = null;
  fecha: string = '';
  hora: string = '';
  colonia: string = '';
  codigo_postal: string = '';
  calle: string = '';
  no_interior: string = '';
  no_exterior: string = '';
  maxFolio: any;

  constructor(private http: HttpClient, private router: Router) { 
    this.obtenerFolio();
  }

  ngOnInit() {
    this.loadData();
  }

  obtenerFolio() {
    axios.get('https://20.172.167.237:3000/folio')
      .then(response => {
        this.maxFolio = response.data.maxFolio;
        const ultimoNumero = Number(this.maxFolio);
        this.folio = ultimoNumero;
        console.log('Ultimo Folio:', this.maxFolio);
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
    this.selectedTab = 'tab2';
    this.router.navigateByUrl('' + tab); // Reemplaza '/form1/' por la ruta correspondiente a tu vista dentro de form1
  }

  
  loadData() {
    this.http.get<any>('../../assets/estados-municipios.json').subscribe(
      (data) => {
        this.estados = Object.keys(data);
        this.municipios = data;
      },
      (error) => {
        console.log('Error al cargar los datos del archivo JSON', error);
      }
      );
    }
    
  siguiente() {
    this.router.navigateByUrl('/form3');
  }

  onEstadoChange() {
    this.selectedMunicipio = null;
  }

  guardar2() {
    const data = {
      folio: this.folio,
      fecha_hecho: this.fecha,
      hora_hecho: this.hora,
      estado_hecho: this.selectedEstado,
      municipio_hecho: this.selectedMunicipio,
      colonia_hecho: this.colonia,
      codigo_postal_hecho: this.codigo_postal,
      calle_hecho: this.calle,
      no_exterior_hecho: this.no_exterior,
      no_interior_hecho: this.no_interior,
    };
    
  
    // Realiza la solicitud POST utilizando Axios
    axios.post('https://20.172.167.237:3000/domicilios', data)
      .then((response) => {
        // Maneja la respuesta exitosa de la inserción en la base de datos
        console.log('Datos guardados exitosamente:', response.data);
        this.siguiente();
      })
      .catch((error) => {
        // Maneja el error en caso de que la inserción falle
        console.error('Error al guardar los datos:', error);
        // Puedes mostrar un mensaje de error al usuario o realizar acciones adicionales según tus necesidades
      });

    }

}
