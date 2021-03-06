import { Component, OnInit } from '@angular/core';
import { HeroModel } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: HeroModel[] = [];

  constructor(private heroService: HeroService) {} 

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(0, 5));
  }


  deleteLeader(): void{
    
    if(this.heroes){
      for(var i = 0; i< this.heroes.length; i++){
        this.heroService.deleteHero(this.heroes[i].id).subscribe();
      }
    }
    window.location.reload();

  }
}
