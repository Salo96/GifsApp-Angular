import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent  {

  constructor( private gifsService: GifsService ){}

  get historial(){
   return this.gifsService.historial;
  }

  buscar( termino:string ){
    // console.log(termino);
    return this.gifsService.buscarGifs( termino );
  }


}
