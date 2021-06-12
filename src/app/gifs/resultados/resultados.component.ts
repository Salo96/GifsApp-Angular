import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent  {

  constructor( private gifservice: GifsService ) { }

  get resultados(){
    //entro a gifservice y busco la variable de array llamado resultado donde contiene toda la informacion
    return this.gifservice.resultado
  }


}
