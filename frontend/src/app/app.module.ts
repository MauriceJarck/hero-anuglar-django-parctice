import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeroesComponent } from './hero-list/hero-list.component';

import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { HeroCreateComponent } from './hero-operation/hero-operation.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { LoginComponent } from './login/login.component'

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PwdResetComponent } from './pwd-reset/pwd-reset.component';
import { authInterceptorProviders } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroCreateComponent,
    HeroSearchComponent,
    LoginComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
