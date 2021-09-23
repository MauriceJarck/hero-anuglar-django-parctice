import { Injectable } from '@angular/core';
import { HeroModel } from './hero'
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient,
              private accService: AccountService,) { }

  private herosURL = 'http://127.0.0.1:5000/heroes/'

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes(): Observable<HeroModel[]> {
    return this.http.get<HeroModel[]>(this.herosURL, this.httpOptions)
      .pipe(
         catchError(x=> this.handleError(x))
      );
  }

  getHero(id: number): Observable<HeroModel> {
    const url = `${this.herosURL}${id}`;
    return this.http.get<HeroModel>(url, this.httpOptions).pipe(
      catchError(x=> this.handleError(x))
      );
  }

  updateHero(hero: HeroModel): Observable<any> {
    return this.http.put(this.herosURL, hero, this.httpOptions).pipe(
      catchError(x=> this.handleError(x))
      )
  }

  newHero(data: FormData){
    console.log(data.get('name'), data.get('img'))
    return this.http.post(this.herosURL, data).pipe(
      catchError(x=> this.handleError(x))
    )
  }

  deleteHero(hero_id: number){
    const url = `${this.herosURL}${hero_id}`;
    return this.http.delete<HeroModel>(url, this.httpOptions).pipe(
      catchError(x=> this.handleError(x))
    )
    }

  searchHeroes(term: string): Observable<HeroModel[]> {
    if(!term.trim()){return of([]);}
    return this.http.get<HeroModel[]>(`${this.herosURL}?search=${term}`, this.httpOptions, ).pipe(
      catchError(x=> this.handleError(x))
      )
  }
}
