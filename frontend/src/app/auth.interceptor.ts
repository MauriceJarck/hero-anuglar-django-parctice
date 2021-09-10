import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { AccountService } from './account.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  accessToken: string = ""
  refreshToken: string = ""
  constructor(
    private accService: AccountService,
  ) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (err.status == 401 || err.status == 403) {
      console.log(this.refreshToken)
      if(!this.accService.isExpired(this.refreshToken)){
        this.accService.getRefreshedTokensFromBackend().subscribe(_ => window.location.href = '/heroes')
      }
      else{
        window.location.href = '/login'
      }
      return of(err.message)
    }
    return throwError(err)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.accessToken = localStorage.getItem("access") || "";
    this.refreshToken = localStorage.getItem("refresh") || "";

    if(req.url.search('/api/') == -1){
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.accessToken) }) 
    }
    
    return next.handle(req).pipe(catchError(x=> this.handleAuthError(x)))
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];