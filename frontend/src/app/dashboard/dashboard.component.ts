import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];
  images: File[] = [];

  constructor(private heroService: HeroService) {} 

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
    for(let i = 0; i>this.images.length; i++){
      this.images[i] = this.heroes[i].img
    }
  }


  deleteAll(): void{
    
    if(this.heroes){
      for(var i = 0; i< this.heroes.length; i++){
        this.heroService.deleteHero(this.heroes[i].id).subscribe();
      }
    }
    window.location.reload();

  }
}
