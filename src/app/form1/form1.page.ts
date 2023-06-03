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
  selectedOption: string = '';
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
  apellidoPaterno2: string = '';
  apellidoMaterno2: string = '';
   id_denunciante = 1;
   folio: number = 0;
   name: string = '';
   apellido_paterno: string = '';
   apellido_materno: string = '';
   fecha_nacimiento: string = '';
   genero: string = '';
   escolaridad: string = '';
   correo_electronico: string = '';
   colonia: string = '';
   codigo_postal: string = '';
   calle: string = '';
   no_exterior: string = '';
   no_interior: string = '';
   tel_celular: string = '';
   tel_fijo: string = '';
   es_victima = true;
   maxFolio: string = '';
     id_denunciante2 = 1;
     name2: string = '';
     apellido_paterno2: string = '';
     apellido_materno2: string = '';
     fecha_nacimiento2: string = '';
     genero2: string = '';
     escolaridad2: string = '';
     correo_electronico2: string = '';
     colonia2: string = '';
     codigo_postal2: string = '';
     calle2: string = '';
     no_exterior2: string = '';
     no_interior2: string = '';
     tel_celular2: string = '';
     tel_fijo2: string = '';
     es_victima2 = "Si";
  
  constructor(private http: HttpClient, private router: Router) {
    this.selectedOption = '';
    this.loadData();
  }

  ngOnInit() {
    this.obtenerFolio();
  }

  onTabChange(event: any) {
    // Lógica para cambiar el contenido según la pestaña seleccionada
    this.selectedTab = event.detail.value;
  }

  navigateTo(tab: string) {
    this.selectedTab = 'tab1';
    this.router.navigateByUrl('' + tab); // Reemplaza '/form1/' por la ruta correspondiente a tu vista dentro de form1
  }

  obtenerFolio() {
    axios.get('https://nodemysql12.duckdns.org:3001/folio')
      .then(response => {
        this.maxFolio = response.data.maxFolio;
        const ultimoNumero = Number(this.maxFolio);
        const nuevoNumero = ultimoNumero + 1;
        this.folio = nuevoNumero;
        console.log('Ultimo Folio:', this.maxFolio);
        console.log('Nuevo folio:', this.folio);
      })
      .catch(error => {
        console.error('Error al obtener el último folio', error);
      });
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
  this.id_denunciante2 = this.id_denunciante2 + 1;
  console.log(this.id_denunciante2);
  }

  agregar() {
    if (this.name2 && this.apellido_paterno2 && this.apellido_materno2) {
      const nuevoNombre = {
        nombre: this.name2,
        apellidoPaterno: this.apellido_paterno2,
        apellidoMaterno: this.apellido_materno2
      };
      this.nombres.push(nuevoNombre);
    }
    this.showCard = false; 
    this.guardar2();

    // Restablecer los campos de entrada después de agregar un nombre
    this.name2 = '';
    this.apellido_paterno2 = '';
    this.apellido_materno2 = '';
    this.fecha_nacimiento2 = '';
    this.genero2 = '';
    this.escolaridad2 = '';
    this.correo_electronico2 = '';
    this.colonia2 = '';
    this.codigo_postal2 = '';
    this.calle2 = '';
    this.no_exterior2 = '';
    this.no_interior2 = '';
    this.tel_celular2 = '';
    this.tel_fijo2 = '';
  }

  eliminar(persona: Persona) {
    const index = this.nombres.indexOf(persona);
    if (index !== -1) {
      this.nombres.splice(index, 1);
    }
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
    
  siguiente() {
      this.router.navigateByUrl('/form2');
  }

  guardar() {
    const data = {
      id_denunciante: this.id_denunciante,
      folio: this.folio,
      nombre: this.name,
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
      es_victima: this.selectedOption,
    };

    console.log(data)
    
    // Realiza la solicitud POST utilizando Axios
    axios.post('https://nodemysql12.duckdns.org:3001/victimas', data)
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

  guardar2() {
    const data2 = {
      id_denunciante: this.id_denunciante2,
      folio: this.folio,
      nombre: this.name2,
      apellido_paterno: this.apellido_paterno2,
      apellido_materno: this.apellido_materno2,
      fecha_nacimiento: this.fecha_nacimiento2,
      genero: this.genero2,
      escolaridad: this.escolaridad2,
      correo_electronico: this.correo_electronico2,
      estado: this.selectedEstado2,
      municipio: this.selectedMunicipio2,
      colonia: this.colonia2,
      codigo_postal: this.codigo_postal2,
      calle: this.calle2,
      no_exterior: this.no_exterior2,
      no_interior: this.no_interior2,
      tel_celular: this.tel_celular2,
      tel_fijo: this.tel_fijo2,
      es_victima: this.es_victima2,
    };

    console.log(data2)
    
    // Realiza la solicitud POST utilizando Axios
    axios.post('https://nodemysql12.duckdns.org:3001/victimas', data2)
      .then((response) => {
        // Maneja la respuesta exitosa de la inserción en la base de datos
        console.log('Datos guardados exitosamente:', response.data);
      })
      .catch((error) => {
        // Maneja el error en caso de que la inserción falle
        console.error('Error al guardar los datos:', error);
        // Puedes mostrar un mensaje de error al usuario o realizar acciones adicionales según tus necesidades
      });

  }

}
