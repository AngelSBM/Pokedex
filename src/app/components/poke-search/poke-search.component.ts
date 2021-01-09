import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.css']
})
export class PokeSearchComponent implements OnInit {

  value: any;

  constructor( private activatedRoute : ActivatedRoute,
               private pokeService     : PokemonService ) {
    this.value = this.activatedRoute.snapshot.params.value;
    
   }

  ngOnInit(): void {

    // this.buscarPokemon()
     

    
  }

  // buscarPokemon(){
  //  this.pokeService.searchPokemon( this.value )
  //       .subscribe( pokemon => {
  //         console.log(pokemon);
          
  //       } )
  // }

}
