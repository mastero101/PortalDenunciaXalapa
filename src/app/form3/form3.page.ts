import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import axios from 'axios';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.page.html',
  styleUrls: ['./form3.page.scss'],
})
export class Form3Page implements OnInit {
  selectedTab: string = 'tab3';
  selectedOption: string;
  selectedOption2: string;
  selectedOption3: string;
  showFormFields: boolean = false;
  showFormFields2: boolean = false;
  folio: number = 0;
  estatura: number = 1.40;
  estados: string[] = [];
  municipios: { [estado: string]: string[] } = {};
  selectedEstado3: string = '';
  selectedMunicipio3: string | null = null;
  nombre_probable_responsable: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  fecha_nacimiento: string = '';
  genero: string = '';
  alias: string = '';
  colonia_domicilio: string = '';
  calle_domicilio: string = '';
  no_exterior_domicilio: string = '';
  no_interior_domicilio: string = '';
  color_piel: string = '';
  color_ojos: string = '';
  tipo_cabello: string = '';
  color_cabello: string = '';
  complexion: string = '';
  tatuajes: string = '';
  tipo_delito: string = '';
  sufrio_danio: string = '';
  hubo_testigos: string = '';
  llamo_emergencia: string = '';
  detalles_hechos: string = '';
  unidad_investigacion: string = '';
  maxFolio: any;


  constructor(private http: HttpClient, private router: Router) {
    this.selectedOption = '';
    this.selectedOption2 = '';
    this.selectedOption3 = '';
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
    this.selectedTab = 'tab3';
    this.router.navigateByUrl('' + tab); // Reemplaza '/form1/' por la ruta correspondiente a tu vista dentro de form1
  }

  toggleFormFields(event: any) {
    this.showFormFields = event.detail.checked;
  }

  toggleFormFields2(event: any) {
    this.showFormFields2 = event.detail.checked;
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

  enviar(){
    this.router.navigate(['/form4']);
  }

  guardar2() {
    const data = {
      folio: this.folio,
      nombre_probable_responsable: this.nombre_probable_responsable,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      fecha_nacimiento: this.fecha_nacimiento,
      genero: this.genero,
      alias: this.alias,
      estado_domicilio: this.selectedEstado3,
      municipio_domicilio: this.selectedMunicipio3,
      colonia_domicilio: this.colonia_domicilio,
      calle_domicilio: this.calle_domicilio,
      no_exterior_domicilio: this.no_exterior_domicilio,
      no_interior_domicilio: this.no_interior_domicilio,
      color_piel: this.color_piel,
      color_ojos: this.color_ojos,
      tipo_cabello: this.tipo_cabello,
      color_cabello: this.color_cabello,
      complexion: this.complexion,
      tatuajes: this.tatuajes,
      estatura: this.estatura,
      tipo_delito: this.tipo_delito,
      sufrio_danio: this.selectedOption,
      hubo_testigos: this.selectedOption2,
      llamo_emergencia: this.selectedOption3,
      detalles_hechos: this.detalles_hechos,
      unidad_investigacion: this.unidad_investigacion,
    };
    
  
    // Realiza la solicitud POST utilizando Axios
    axios.post('https://20.172.167.237:3000/informes', data)
      .then((response) => {
        // Maneja la respuesta exitosa de la inserción en la base de datos
        console.log('Datos guardados exitosamente:', response.data);
        this.enviar();
      })
      .catch((error) => {
        // Maneja el error en caso de que la inserción falle
        console.error('Error al guardar los datos:', error);
        // Puedes mostrar un mensaje de error al usuario o realizar acciones adicionales según tus necesidades
      });

    }
}
