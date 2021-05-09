import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  // Viewchild, va a buscar en el HTML un elemento que tenga una referencia local igual al contendio del ViewChild y lo asignará
  // a ese elemento txtBuscar
  @ViewChild('txtBuscar') txtBuscar:ElementRef<HTMLInputElement> ;

  constructor(private gifsService: GifsService){

  }

  buscar(){
    
    const valor = this.txtBuscar.nativeElement.value;
    // Controlamos que el inputa de buscar, funcione en un input vacío
    if(valor.trim().length == 0){
      return;
    }

    this.gifsService.buscarGifs(valor)
    this.txtBuscar.nativeElement.value = "";
  }

}
