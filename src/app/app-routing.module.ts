import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokeDetailComponent } from './components/poke-detail/poke-detail.component';
import { PokeHomeComponent } from './components/poke-home/poke-home.component';

const routes: Routes = [
  { path:'home', component: PokeHomeComponent },
  { path:'detail/:id', component: PokeDetailComponent },
  { path:'**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
