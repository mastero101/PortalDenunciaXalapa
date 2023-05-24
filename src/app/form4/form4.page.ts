import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form4',
  templateUrl: './form4.page.html',
  styleUrls: ['./form4.page.scss'],
})
export class Form4Page implements OnInit {
  selectedTab: string = 'tab4';
  envioExitoso: boolean = false;
  ocultarElementos: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
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
    // Lógica para enviar la denuncia

    // Una vez que se confirma el envío, se establece la variable envioExitoso como verdadera
    this.envioExitoso = true;
    this.ocultarElementos = true;
  }

  noEnviar(){
    this.router.navigate(['/form3']);
    this.envioExitoso = false;
  }

  realizarOtraDenuncia(){

  }

  irAInicio(){

  }

  verFolio(){

  }
}
