import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokeDetailComponent } from './components/poke-detail/poke-detail.component';
import { PokeHomeComponent } from './components/poke-home/poke-home.component';
import { PokeSearchComponent } from './components/poke-search/poke-search.component';

const routes: Routes = [
  { path:'home', component: PokeHomeComponent },
  { path:'detail/:id', component: PokeDetailComponent },
  { path:'search/:value', component: PokeSearchComponent },
  { path:'**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
