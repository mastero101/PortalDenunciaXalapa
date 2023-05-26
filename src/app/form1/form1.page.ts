import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

interface Persona {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}


@Component({
  selector: 'app-form1',
  templateUrl: './form1.page.html',
  styleUrls: ['./form1.page.scss'],
})
export class Form1Page implements OnInit {
  selectedTab: string = 'tab1';
  selectedOption: string;
  showCard: boolean = false;
  nombres: Persona[] = [];
  nombre: string = '';
  apellidoPaterno: string = '';
  apellidoMaterno: string = '';
  estados: string[] = [];
  municipios: { [estado: string]: string[] } = {};
  selectedEstado: string = '';
  selectedMunicipio: string | null = null;
  selectedEstado2: string = '';
  selectedMunicipio2: string | null = null;
   id_denunciante = 1;
   folio = '123456';
   name = 'Juan';
   apellido_paterno = 'Pérez';
   apellido_materno = 'Gómez';
   fecha_nacimiento = '1990-05-10';
   genero = 'Masculino';
   escolaridad = 'Universidad';
   correo_electronico = 'juan@example.com';
   estado = 'Estado';
   municipio = 'Municipio';
   colonia = 'Colonia';
   codigo_postal = '12345';
   calle = 'Calle';
   no_exterior = '123';
   no_interior = 'A';
   tel_celular = '555-123-4567';
   tel_fijo = '555-987-6543';
   es_victima = true;
  
  constructor(private http: HttpClient, private router: Router) {
    this.selectedOption = '';
    this.loadData();
   }

  ngOnInit() {
  }

  onTabChange(event: any) {
    // Lógica para cambiar el contenido según la pestaña seleccionada
    this.selectedTab = event.detail.value;
  }

  navigateTo(tab: string) {
    this.selectedTab = 'tab1';
    this.router.navigateByUrl('' + tab); // Reemplaza '/form1/' por la ruta correspondiente a tu vista dentro de form1
  }

  toggleCard() {
  this.showCard = !this.showCard;
  const elementos = document.getElementsByClassName('agregar');
  if (elementos) {
    for (let i = 0; i < elementos.length; i++) {
      const elemento = elementos[i] as HTMLElement;
      elemento.style.height = '45em';
      // Modifica el estilo del elemento según tus necesidades
    }
  }
  }

  agregar() {
  if (this.nombre && this.apellidoPaterno && this.apellidoMaterno) {
    const persona: Persona = {
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno
    };
    
    this.nombres.push(persona);
    this.nombre = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
  }
  this.showCard = false;  
  }

  eliminar(persona: Persona) {
    const index = this.nombres.indexOf(persona);
    if (index !== -1) {
      this.nombres.splice(index, 1);
    }
  }

  guardar() {
      this.router.navigateByUrl('/form2');
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

  onEstadoChange() {

  }

  guardar2() {
    const data = {
      id_denunciante: this.id_denunciante,
      folio: this.folio,
      nombre: this.nombre,
      apellido_paterno: this.apellidoPaterno,
      apellido_materno: this.apellidoMaterno,
      fecha_nacimiento: this.fecha_nacimiento,
      genero: this.genero,
      escolaridad: this.escolaridad,
      correo_electronico: this.correo_electronico,
      estado: this.selectedEstado,
      municipio: this.selectedMunicipio,
      colonia: this.colonia,
      codigo_postal: this.codigo_postal,
      calle: this.calle,
      no_exterior: this.no_exterior,
      no_interior: this.no_interior,
      tel_celular: this.tel_celular,
      tel_fijo: this.tel_fijo,
      es_victima: this.es_victima,
    };
    
  
    // Realiza la solicitud POST utilizando Axios
    axios.post('http://20.172.167.237:3000/victimas', data)
      .then((response) => {
        // Maneja la respuesta exitosa de la inserción en la base de datos
        console.log('Datos guardados exitosamente:', response.data);
        // Puedes realizar acciones adicionales aquí, como mostrar un mensaje de éxito o redireccionar a otra página
      })
      .catch((error) => {
        // Maneja el error en caso de que la inserción falle
        console.error('Error al guardar los datos:', error);
        // Puedes mostrar un mensaje de error al usuario o realizar acciones adicionales según tus necesidades
      });
    }

}
