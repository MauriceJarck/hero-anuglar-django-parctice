import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { HeroModel } from '../hero';

@Component({
  selector: 'app-hero-operation',
  templateUrl: './hero-operation.component.html',
  styleUrls: ['./hero-operation.component.css']
})
export class HeroCreateComponent implements OnInit {
  name!: string;
  heroes: HeroModel[] = [];
  url: any = "/assets/images/placeholder.png"
  img?: any


  constructor(private http: HttpClient,
    private heroService: HeroService,
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
  selectFile(event: any){
    var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = (_event) => {
		this.url = reader.result;
    this.img = event.target.files[0];
		}
  }


  newHero(): void {
    if (!this.name) { return; }
    const uploadData = new FormData();
    uploadData.append('name', this.name);
    uploadData.append('img', this.img);
    this.heroService.newHero(uploadData).subscribe();

  }

  goBack(): void {
    this.location.back();
  }
}
