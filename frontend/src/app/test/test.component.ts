import { Component, OnInit } from '@angular/core';
import { of, Observable, Observer, throwError, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HeroModel } from '../hero';
import { UserModel } from '../user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-test',
  template: `
  <button (click) = "getHeroesButton()">get heroes</button>
  <div class="test">
    <div [hidden]="!visible">
      <label>wrong credentials</label>
    </div>
  </div>`,
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  private baseURL = 'http://127.0.0.1:5000/'
  subscription: Subscription
  constructor(
    private http: HttpClient,
    private mesSer: MessageService,
    ) {     
       localStorage.removeItem('access')
       this.subscription = this.mesSer.getMessage().subscribe(message => {
         if(message){
           this.visible = Boolean(message);
         }
       })
    }

  ngOnInit(): void {
    localStorage.removeItem('access')
    this.getTokensFromBackend("maurice.jarck", "1234").subscribe(() =>alert("auth ok"), err => this.mesSer.sendMessage("false"))
  }
  visible = false;
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('access') } )
  };

  getHeroesButton(){
    this.getHeroes().subscribe((pass) => alert(pass), err => alert("auth not ok"));
  }

  getHeroes(): Observable<HeroModel[]> {
    return this.http.get<HeroModel[]>(this.baseURL + "heroes/", this.httpOptions)

  }
  getTokensFromBackend(username: string, password:string){
    return this.http.post<UserModel>(this.baseURL + 'api/token/', {username, password}).pipe(
      tap(res => localStorage.setItem('access', res['access'])),
      tap(_ => console.log(localStorage.getItem('access'))),
      )
  }
}

