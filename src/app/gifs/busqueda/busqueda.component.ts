import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  //hago la instancia con el servicio
  constructor( private gifsService: GifsService ){};

  // buscar( search: string ){
  //   console.log( this.txtBuscar );
  // }

  buscar( ){
    //obtengo el valor de la busqueda
    const valor = this.txtBuscar.nativeElement.value;

    //sino tiene nada auque sea una palabra, no mande nada
    if( valor.trim().length === 0 ){
      return;
    }
    
    //mando el valor al servicio
    this.gifsService.buscarGifs( valor )

    //borro el contenido de la busqueda
    this.txtBuscar.nativeElement.value="";
  }

}
