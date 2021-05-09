import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
// Interface para la respuesta Http de los gifs
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

 private apiKey     : string = "zgRo0ens3mllni6473jECcvF5vEhmg6d";
 private servicioUrl: string = "https://api.giphy.com/v1/gifs"
 private _historial : string[] = [];

 //TODO: Cambiar any por su tipo correspondiente: en este caso de tipo Gif
 public resultados: Gif[] = [];

 get historial(){
   return [...this._historial];
 }

 constructor( private http: HttpClient) {
  
  this._historial = JSON.parse(localStorage.getItem('historial')!) || []; 
  this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  /* //Primera Forma:  cargar el local Storage, en el constructor porque solo se ejecuta 1 unica vez cuando es llamado.
   if(localStorage.getItem('historial')){
     // CONVERTIRMOS el contenigo del local storage y lo volvemos a su estado inicial para guardarlo en _historial
    this._historial = JSON.parse(localStorage.getItem('historial')!);
   }; */
 }


 /* // Segunda Forma
 async*/
 buscarGifs( query: string = ''){

  // guardamos todo en minuscula
  query = query.trim().toLowerCase();

  // Evaluamos si nuestra busqueda ya existe, para evitar duplicados en el ARREGLO HISTORIAL
  if( !this._historial.includes(query) ){
    this._historial.unshift(query);
    this._historial = this._historial.splice(0,10);
    // Grabar en el LocaLSTORAGE para persistir información a pesar de que refresquemos el navegador
    localStorage.setItem('historial', JSON.stringify(this._historial));
  }

  /* // PRIMERA FORMA  
    fetch('https://api.giphy.com/v1/gifs/search?api_key=zgRo0ens3mllni6473jECcvF5vEhmg6d&q=dragon ball z&limit=10')
    .then( resp => {
      resp.json().then(data =>{
        console.log(data);
      })
    }); */

    /* // Segunda Forma 
    const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=zgRo0ens3mllni6473jECcvF5vEhmg6d&q=dragon ball z&limit=10');
    const data = await resp.json();
    console.log(data); */

    // Http Params
    const params = new HttpParams().set('api_key',this.apiKey)
                                   .set('q',query)
                                   .set('limit','10');
    //console.log( params.toString());
    

  this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params: params })
           .subscribe( (resp ) =>{
            this.resultados = resp.data;
            // Grabar en el local storage nuestros ultimos resultados
            localStorage.setItem('resultados', JSON.stringify(this.resultados));
            //console.log(resp.data);
          })
  //console.log(this._historial);

 }

}
