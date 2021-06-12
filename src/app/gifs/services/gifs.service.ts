import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:     string = 'm4SeTPGTMM2m0tTaZi5k65UFFzstnXbD'; 
  private URL:        string = 'https://api.giphy.com/v1/gifs/search'
  private limit:      string = 'limit=15';
  private _historial: string[]=[];
  public resultado:   Gif[]=[];

  constructor( private http: HttpClient ){

    //despues de guardar en el localStorage, mostrar la informacion guardada en la pantalla, despues de f5 se mantiene lo guardado
    if( localStorage.getItem('historial')  && localStorage.getItem('gifs')){

      //el parse sirve para q el tipado este en su forma base y el signo ! para eliminar el error q muestra
      this._historial = JSON.parse( localStorage.getItem('historial')! );

      //sacar los gifs del localStorage
      this.resultado = JSON.parse( localStorage.getItem('gifs')! );

    }

  }

  get historial(){
    return [...this._historial];
  }

  buscarGifs( query: string ){

    //sirva para poner en miniscula ejemplo DBZ a dbz y no salga repetido por mayuscula o miniscula
    query = query.trim().toLowerCase();

    //condicion para que no insertar valores repetidos en el array
    if( !this._historial.includes( query ) ) {

      //agrego los resultado en un array
      this._historial.unshift( query );

      //para que en la vista solo tenga 10 valores a mostrar
      this._historial = this._historial.splice( 0, 10 );

      //guardar el resultado el localStorage para cuando actualize no borre los resultados (JSON.stringify convierte valores a string)
      localStorage.setItem('historial', JSON.stringify( this._historial ) );

    }

    //peticion http para el consumo de la api
    this.http.get<SearchGifsResponse>(`${this.URL}?api_key=${ this.apiKey }&q=${ query }&${ this.limit }`)
    .subscribe( ( resp ) => {
      // console.log( resp.data );

      //todo el contenido de la api se va a la variable resultado
      this.resultado = resp.data

      //guardar el ultimo resultado de los gifs (img) en el localStorage 
      localStorage.setItem('gifs', JSON.stringify( this.resultado ) );

    })

    // console.log( this._historial );

  }
}
