import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  

  constructor(private router: Router) {
    this.selectedOption = '';
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

}
