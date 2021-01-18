import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from 'src/app/interfaces/pokemon.response';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.css']
})
export class PokeSearchComponent implements OnInit {

  value: string;
  pokemon: Pokemon;
  searching: boolean = false;


  constructor( private activatedRoute : ActivatedRoute,
               private pokeService     : PokemonService ) {
     this.activatedRoute.paramMap.subscribe( param => {

      //Each time the param change, the execute the function to look the pokemon with that param
       this.value = param.get('value').toLowerCase();
       this.buscarPokemon();
     } )
    
   }

  ngOnInit(): void {
      
  }

  buscarPokemon(){
   this.pokeService.searchPokemon( this.value )
        .subscribe( pokemon => {

          //We got the pokemon, so "searching" must be false
          this.searching = false;
          
          this.pokemon = pokemon;
         
        }, error => {
          
          //If loading is true, it means that is looking for the pokemon or it doesn´t exists, so [ while loading === true { showLoadingIcon(); } ]
          this.searching = true;

        } )
  }

}
