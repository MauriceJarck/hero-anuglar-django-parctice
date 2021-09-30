import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { UserModel } from './user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RespModel } from './resp';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  tokenPayload: any
  accessToken?: any
  refreshToken?: any
  expirationDateAccess: any
  expirationDateRefresh: any

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    ) { }

  private baseURL = 'http://127.0.0.1:5000/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken } )
  };

  getAccessTokenPayload(){
    return JSON.stringify(this.jwtHelper.decodeToken(this.accessToken))
  }

  getTokenExpirationDate(token: string){
    var expirationDate = this.jwtHelper.getTokenExpirationDate(token)
    return expirationDate
  }

  isExpired(token: string): boolean{
    return this.jwtHelper.isTokenExpired(token)
  }

  getTokensFromBackend(username: string, password:string){
    return this.http.post<UserModel>(this.baseURL + 'api/token/', {username, password}).pipe(
      tap(res => {
        this.saveTokens(res, false)
        console.log(res)
      }))
  }

  refreshTokenFromBackend(){
    console.log(this.refreshToken)
    return this.http.post<RespModel>(this.baseURL + 'api/token/refresh/', {'refresh': localStorage.getItem('refresh')}, this.httpOptions).pipe(
    tap(res => console.log(`got refreshed tokens ${res['access']}`)),
    tap(res => this.saveTokens(res, true)),
    );
  }

  saveTokens(res: any, refresh: boolean){
    var accessToken: string = res['access']
    var refreshToken: string = res['refresh']

    //if access token is refreshed there is no new refresh token. 
    //This is implemented not to overwrite refresh-token to undefined.
    if(refresh){
      this.accessToken = accessToken
      localStorage.setItem('access', accessToken)
    }
    else{
      this.accessToken = accessToken
      localStorage.setItem('access', accessToken)
      this.refreshToken = refreshToken
      localStorage.setItem('refresh', refreshToken)
    }
  }

  logout(){
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    location.href = "/login"
  }

  getEmail(email: string){
    // if(!email.trim()){return of([]);}
    return this.http.get(`${this.baseURL}?search=${email}`, this.httpOptions, )
  }
}
