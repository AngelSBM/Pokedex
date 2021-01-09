import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from "rxjs/operators";
import { Pokemon } from '../interfaces/pokemon.response';
import { PokedexResponse, Result } from '../interfaces/pokemons.response';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl : string = 'https://pokeapi.co/api/v2/pokemon'
  offset: number = 0;
  limit: number = 10
  cargando: boolean = false

  get params(){
    return {
      offset: this.offset.toString(),
      limit: this.limit.toString()
    }
  }
  
  pokemones:any

  constructor( public http: HttpClient ) {}

  getPokemon(){
    if( this.cargando ){
      return
    }

    this.cargando = true;

    return this.http.get<PokedexResponse>(`${ this.baseUrl }`, {
      params: this.params
    }).pipe(
        map( result => result.results ),

        tap( () => {
          this.offset += 10;
          this.cargando = false
        } )
        
       )
        
  }


  getMoreData( url: string ){
     return this.http.get<Pokemon>(url)
  }

  searchPokemon( value : any ){

    return this.http.get<Pokemon>(`${this.baseUrl}/${value}`)

  }

}
