import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/interfaces/pokemon.response';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchValue: any;
  pokemon : Pokemon;
      

  constructor( private route      : Router,
               private location   : Location,
               private pokeServive: PokemonService) { }

  ngOnInit(): void {
  }

  buscar ( valor: string ){
    
    //If user types, go to result pages, else go back to home
    if( valor.length !== 0 ){
      this.route.navigate(['search', valor])
    } else {
      this.route.navigate(['home'])
    }

    // this.pokeServive.searchPokemon( valor )
    //     .subscribe( data => {
    //       this.pokemon = data;
    //       console.log(this.pokemon);
          
    //     } )

  }

  
  cleanInput ( input ){
    input.value = ''
  }

}
