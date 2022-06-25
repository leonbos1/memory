import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //if (localStorage.getItem('token') === null || this.auth.isExpired(localStorage.getItem('token'))) {
     // localStorage.removeItem('token')
      //window.location.href = "/login";
     // next.handle(req)
    //}

    let newHeaders = req.headers
    let token = localStorage.getItem('token')

    if (token) {
      newHeaders = newHeaders.append('Authorization',`Bearer ${token}`)
    }

    const cloneRequest = req.clone({headers:newHeaders})

    return next.handle(cloneRequest)

    
  }
}
