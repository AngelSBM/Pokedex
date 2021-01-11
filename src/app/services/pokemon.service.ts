import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from "rxjs/operators";
import { Pokemon } from '../interfaces/pokemon.response';
import { PokedexResponse, Result } from '../interfaces/pokemons.response';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  //BaseUrl, offset and limit are the params used in getPokemon() to get all the pokemons in the home-component, they´re created in this way for implement the infity-scroll.
  baseUrl : string = 'https://pokeapi.co/api/v2/pokemon';  
  offset  : number = 0;
  limit   : number = 10;


  //Variable used for prevent that our function getPokemon() make multple calls in the infinite scroll, so there won´t be a call bringing 1000 pokemons to the home-component at once.  
  cargando: boolean = false;

  get params(){
    return {
      offset: this.offset.toString(),
      limit: this.limit.toString()
    }
  }
  

  constructor( public http: HttpClient ) {}

  getPokemon(){

    //If cargando === true then return, when our get<PokedexResponse> got the data, then "this.cargando" === false. There´s another method that switch cargando into true in home-component, it´s a double validation
    if ( this.cargando ){ return }

      this.cargando = true;
      return this.http.get<PokedexResponse>(`${ this.baseUrl }`, {
        params: this.params
      }).pipe(

          map( result => result.results ),

          tap( () => {
            this.offset += 10;
            this.cargando = false
          } )
          
        );

  }


  //getPokemon just bring the url of the pokemons, but we want what is inside those url´s, so this method is aplicated in each url of the pokemon array
  getMoreData( url: string ){
     return this.http.get<Pokemon>(url)
  }

  //Each time we type, this return result of our "Termino de busqueda"
  searchPokemon( value : any ){

    return this.http.get<Pokemon>(`${this.baseUrl}/${value}`)

  }

}
