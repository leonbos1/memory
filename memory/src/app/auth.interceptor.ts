import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newHeaders = req.headers
    let token = localStorage.getItem('token')

    if (token) {
      newHeaders = newHeaders.append('Authorization',`Bearer ${token}`)
    }

    const cloneRequest = req.clone({headers:newHeaders})

    return next.handle(cloneRequest)
  }
}
