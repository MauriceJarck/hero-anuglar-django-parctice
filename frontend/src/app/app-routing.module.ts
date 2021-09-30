import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './hero-list/hero-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroCreateComponent } from './hero-operation/hero-operation.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{path: 'login', component: LoginComponent}, 
                        {path: 'heroes', component: HeroesComponent}, 
                        {path: 'dashboard', component: DashboardComponent}, 
                        {path: 'create-hero', component: HeroCreateComponent}, 
                        {path: '', redirectTo: '/login', pathMatch: 'full' },
                        {path: 'detail/:id', component: HeroDetailComponent},
                        {path: '**', redirectTo: '/login'}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
