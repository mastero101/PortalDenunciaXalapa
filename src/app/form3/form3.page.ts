import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  estatura: number = 1.40;
  mostrarConfirmacion: boolean = true;
  mostrarConfirmacionExitosa: boolean = false; 

  constructor(private router: Router) {
    this.selectedOption = '';
    this.selectedOption2 = '';
    this.selectedOption3 = '';
   }

  ngOnInit() {
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

  enviarDenuncia() {
    // Aquí puedes realizar las acciones necesarias para enviar la denuncia
    // por ejemplo, realizar una petición HTTP al servidor
  
    // Después de enviar la denuncia exitosamente, mostramos la pantalla de confirmación exitosa
    this.mostrarConfirmacion = false;
    this.mostrarConfirmacionExitosa = true;
  }

  cancelarEnvio() {
    // Aquí puedes realizar las acciones necesarias al cancelar el envío de la denuncia
    // por ejemplo, restablecer los campos del formulario
  
    // Volvemos a mostrar la pantalla de confirmación
    this.mostrarConfirmacion = true;
    this.mostrarConfirmacionExitosa = false;
  }
  
  // Función para realizar otra denuncia
  realizarOtraDenuncia() {
    // Aquí puedes realizar las acciones necesarias para iniciar una nueva denuncia
  
    // Volvemos a mostrar la pantalla de confirmación
    this.mostrarConfirmacion = true;
    this.mostrarConfirmacionExitosa = false;
  }
  
  // Función para ir a la página de inicio
  irAInicio() {
    // Aquí puedes realizar las acciones necesarias para navegar a la página de inicio
  }
  
  // Función para ver el folio de la denuncia
  verFolio() {
    // Aquí puedes realizar las acciones necesarias para mostrar el folio de la denuncia
  }

}
