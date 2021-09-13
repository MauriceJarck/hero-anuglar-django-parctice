import { Injectable } from '@angular/core';
import { HeroModel } from './hero'
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
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<HeroModel[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<HeroModel> {
    const url = `${this.herosURL}${id}`;
    return this.http.get<HeroModel>(url, this.httpOptions).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<HeroModel>(`getHero id=${id}`))
    );
  }

  updateHero(hero: HeroModel): Observable<any> {
    return this.http.put(this.herosURL, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  newHero(data: FormData){
    let hero_name = data.get('name')
    console.log(data.get('name'), data.get('img'))
    return this.http.post(this.herosURL, data).pipe(
        tap(_ => this.log(`added hero w/ id=${hero_name}`)),
        catchError(this.handleError<HeroModel>('add HeroModel')));
  }

  deleteHero(hero_id: number){
    const url = `${this.herosURL}${hero_id}`;
    return this.http.delete<HeroModel>(url, this.httpOptions).pipe(
      tap(_=> this.log(`HeroModel id=${hero_id} deleted`),
      catchError(this.handleError<HeroModel>('delete HeroModel'))))
  }

  searchHeroes(term: string): Observable<HeroModel[]> {
    if(!term.trim()){return of([]);}
    return this.http.get<HeroModel[]>(`${this.herosURL}?name=${term}`, this.httpOptions, ).pipe(
      tap(x=> x.length ?
        this.log(`found heros matching "${term}"`):
        this.log(`no heroes matching "${term}"`),
        catchError(this.handleError<HeroModel[]>('searchHeroes'))))
  }
}
