import { Component, OnInit } from '@angular/core';
import { HeroModel } from '../hero'
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero?: HeroModel;
  onSelect(hero: HeroModel):void{
    this.selectedHero = hero;
  }
  heroes: HeroModel[] = [];

  constructor(private heroService: HeroService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)
  }


}
