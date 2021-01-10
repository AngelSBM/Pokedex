import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon.response';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.css']
})
export class PokeDetailComponent implements OnInit {

  pokemon: Pokemon
  id: string

  constructor( private route       : ActivatedRoute,
               private pokeService : PokemonService,
               private location    : Location ) {
      this.id = this.route.snapshot.paramMap.get('id')   
   }

  ngOnInit(): void {

    this.pokeService.searchPokemon(this.id)
          .subscribe( pokeData => {
            this.pokemon = pokeData;
            console.log(this.pokemon.types);
            
          } )

  }

  back () {
    this.location.back()
  }


}
