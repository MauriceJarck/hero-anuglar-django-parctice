import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-operation',
  templateUrl: './hero-operation.component.html',
  styleUrls: ['./hero-operation.component.css']
})
export class HeroCreateComponent implements OnInit {
  name!: string;
  heroes: Hero[] = [];

  constructor(private http: HttpClient, 
    private heroService: HeroService,
    private messageService: MessageService, 
    private location: Location) { }

  ngOnInit(): void {
  }
  
  onNameChanged(event: any){
    this.name = event.target.value;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  newHero(): void {
    const name = this.name
    if (!name) { return; }
    this.heroService.newHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  goBack(): void {
    this.location.back();
  }
}
