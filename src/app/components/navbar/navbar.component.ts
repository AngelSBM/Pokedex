import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon.response';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  // The value must be a string or number
  searchValue: any;      

  constructor( private route : Router ) { }


  buscar ( valor: string ){
    
    //If user types, go to search-component with the input value as a param, else go back to home-component
    if( valor.length !== 0 ){
      this.route.navigate(['/search', valor])
    } else {
      this.route.navigate(['/home'])
    }

  }

  
  cleanInput ( input ){
    input.value = ''
  }

}
