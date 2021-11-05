import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BenvingudaComponent } from './benvinguda/benvinguda.component';
import { NavComponentComponent } from './nav-component/nav-component.component';


const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'', component:NavComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
