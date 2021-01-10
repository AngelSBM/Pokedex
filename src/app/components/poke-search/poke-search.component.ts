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

  value: any;
  pokemon: Pokemon;
  searching: boolean = false;


  constructor( private activatedRoute : ActivatedRoute,
               private pokeService     : PokemonService ) {
     this.activatedRoute.paramMap.subscribe( param => {
       this.value = param.get('value');
       this.buscarPokemon()
     } )
    
   }

  ngOnInit(): void {

      this.buscarPokemon()
      
  }

  buscarPokemon(){
   this.pokeService.searchPokemon( this.value )
        .subscribe( pokemon => {
          
          this.pokemon = pokemon
          this.searching = false
         
        }, error => {
          
          this.searching = true

        } )
  }

}
