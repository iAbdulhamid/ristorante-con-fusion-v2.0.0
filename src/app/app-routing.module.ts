import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  { path: 'home',           component: HomeComponent },
  { path: 'menu',           component: MenuComponent },
  { path: 'about',           component: AboutComponent },
  { path: 'dishdetail/:id', component: DishDetailComponent },
  { path: 'contact',        component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
