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
  heroes: any[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      (res) => this.heroes = res,
      err => console.log(err),
      )
  }


}
