import { Injectable } from '@angular/core';
import { Hero } from './hero'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  private log(message: string){
    this.messageService.add(`heroservice[${new Date().toLocaleString()}]: ${message}`);
  }

  private herosURL = 'http://127.0.0.1:5000/heros/'

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

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.herosURL)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.herosURL}${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.herosURL, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  newHero(data: FormData){
    let hero_name = data.get('name')
    return this.http.post('http://127.0.0.1:5000/heros/', data).pipe(
        tap(_ => this.log(`added hero w/ id=${hero_name}`)),
        catchError(this.handleError<Hero>('add Hero')));
  }

  deleteHero(hero_id: number){
    const url = `${this.herosURL}${hero_id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_=> this.log(`Hero id=${hero_id} deleted`), 
      catchError(this.handleError<Hero>('delete Hero'))))
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if(!term.trim()){return of([]);}
    return this.http.get<Hero[]>(`${this.herosURL}?name=${term}`).pipe(
      tap(x=> x.length ? 
        this.log(`found heros matching "${term}"`):
        this.log(`no heroes matching "${term}"`), catchError(this.handleError<Hero[]>('searchHeroes'))))
  }
}
