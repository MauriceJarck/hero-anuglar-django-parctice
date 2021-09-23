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
    private jwtHelper: JwtHelperService,
    ) { }

  private baseURL = 'http://127.0.0.1:5000/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.accessToken } )
  };

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status == 401 || err.status == 403) {
      if(!this.isExpired(this.refreshToken)){
        this.refreshTokenFromBackend().subscribe(_ => window.location.reload())
      }
      else{
        window.location.reload()
        // window.location.href = '/login'
      }
      // return of(err.message)
    }
    return throwError(err)
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
      tap(res => this.saveTokens(res, false)))
  }

  refreshTokenFromBackend(){
    console.log(this.refreshToken)
    return this.http.post<RespModel>(this.baseURL + 'api/token/refresh/', {'refresh': localStorage.getItem('refresh')}, this.httpOptions).pipe(
    tap(res => console.log(`got refreshed tokens ${res['access']}`)),
    tap(res => this.saveTokens(res, true)),
    // catchError(x=> this.handleAuthError(x))
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

  deleteToken(){
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
  }
}
