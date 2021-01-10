import { Component, HostListener, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
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

  //////////////////////////////

    @HostListener('window:scroll',['$event'])
  onScroll(){
    
    const pos = document.documentElement.scrollTop + 1000
    const max =  document.documentElement.scrollHeight
    
    if( pos > max ){

      if( this.pokeService.cargando == true ){ return }


      this.pokeService.getPokemon().subscribe( (data)=> {
        data.forEach( pokemonNew => {
          this.pokeService.getMoreData(pokemonNew.url)
                .subscribe( pokemonNewData => {
                  this.pokemons.push( pokemonNewData )
                } )
        } )
        
      } )
    }

  }
    ////////////////////////////

  constructor( private pokeService: PokemonService ) {
    this.pokeService.offset = 0
   }

  ngOnInit(): void {
    
    this.getPokemons();

    
  }

  getPokemons(){
    
    this.pokeService.getPokemon()
        .subscribe( data => {
          data.forEach( pokemon => {
            this.pokeService.getMoreData(pokemon.url)
                  .subscribe( data => {
                    this.pokemons.push( data )              
                  } )
          } )
        } )      
    
  }

  

}
