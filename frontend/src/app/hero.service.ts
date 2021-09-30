import { Injectable } from '@angular/core';
import { HeroModel } from './hero'
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, concatMap, retryWhen, tap, delay } from 'rxjs/operators';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient,
              private accService: AccountService,) { }

  private herosURL = 'http://127.0.0.1:5000/heroes/'
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('access') } )
  };

  getHeroes(): Observable<HeroModel[]> {
    return this.http.get<HeroModel[]>(this.herosURL)
    }

  getHero(id: number): Observable<HeroModel> {
    const url = this.herosURL + id;
    return this.http.get<HeroModel>(url)
  }

  updateHero(hero: HeroModel): Observable<any> {
    return this.http.put(this.herosURL, hero)
  }

  newHero(data: FormData){
    console.log(data.get('name'), data.get('img'))
    return this.http.post(this.herosURL, data)
  }

  deleteHero(hero_id: number){
    const url = this.herosURL + hero_id;
    return this.http.delete<HeroModel>(url)
    }

  searchHeroes(term: string): Observable<HeroModel[]> {
    if(!term.trim()){return of([]);}
    return this.http.get<HeroModel[]>(`${this.herosURL}?search=${term}`)
  }
}
