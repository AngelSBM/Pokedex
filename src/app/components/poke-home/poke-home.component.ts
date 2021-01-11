import { Component, HostListener, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/interfaces/pokemon.response';
import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-poke-home',
  templateUrl: './poke-home.component.html',
  styleUrls: ['./poke-home.component.css']
})
export class PokeHomeComponent implements OnInit {

  pokemons: Pokemon[] = [];
  loading: boolean = false;

  //Event! each time we scroll down and we are near from the end of the page, this bring more pokemons with
  @HostListener('window:scroll',['$event'])
  onScroll(){
    
    const pos = document.documentElement.scrollTop + 1000; //Our position in the window + a margin to call the function before we come to the end.
    const max =  document.documentElement.scrollHeight; 
    
    if( pos > max ){

      if( this.pokeService.cargando == true ){ return }


      this.pokeService.getPokemon().subscribe( (data)=> {
        data.forEach( pokemonNew => {
          this.pokeService.getMoreData( pokemonNew.url )
                .subscribe( pokemonNewData => {
                  this.pokemons.push( pokemonNewData );
                } );
        });
      });
    }

  }



  constructor( private pokeService: PokemonService ) {
    //Each time we go back to home-component, it´ll bring the first 20 pokemon again, so if we went to the Pokemon No.541 when we go back home, it wont start showing pokemons from 541
    this.pokeService.offset = 0;
   }

  ngOnInit(): void {
    
    //When the component initialize, the first thing it will do is call the pokemons
    this.getPokemons();

    
  }

  //We subscribe to the method getPokemon() and it´ll bring an array, each position of the array contains the pokemon URL with all their information, so we use a method in PokemonService to each URL to bring the information of each URL an push it in the array pokemon[], this array is used for our home-component.html to show the pokemons
  getPokemons(){
    
    this.pokeService.getPokemon()
        .subscribe( data => {
          data.forEach( pokemon => {
            this.pokeService.getMoreData( pokemon.url )
                  .subscribe( data => {
                    this.pokemons.push( data )              
                  });
          });
        });       
  }


}
