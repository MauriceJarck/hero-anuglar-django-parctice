import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
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
    private messageService: MessageService,
    private jwtHelper: JwtHelperService) { }


  private log(message: string){
    this.messageService.add(`heroservice[${new Date().toLocaleString()}]: ${message}`);
  }

  private baseURL = 'http://127.0.0.1:5000/'

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
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
      tap(_ => console.log("logged in")),
      tap(res => this.saveTokens(res, false)),
      catchError(this.handleError<UserModel>(`getToken: ${username}`)
      )
    );
  }

  getRefreshedTokensFromBackend(){
    console.log(this.refreshToken)
    return this.http.post<RespModel>(this.baseURL + 'api/token/refresh/', {'refresh': localStorage.getItem('refresh')}).pipe(
    tap(res => console.log(`got refreshed tokens ${res['access']}`)),
    tap(res => this.saveTokens(res, true)),
    catchError(this.handleError<RespModel>(`refreshToken}`)
      )
    );
  }

  saveTokens(res: any, refresh: boolean){
    var accessToken: string = res['access']
    var refreshToken: string = res['refresh']

    //if access token is refreshed there is no new refresh token. 
    //This is implemented not to overwrite refreshtoken to undefined.
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

  deleteToken(){
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
  }
}
