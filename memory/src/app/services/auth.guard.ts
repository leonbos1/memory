import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = localStorage.getItem('token')

      if (!token) {
        this.router.navigate(['login'])
        return false
      }

      var isAuthenticated = this.authService.isAdmin(token);
      if (!isAuthenticated || this.authService.isExpired(token)) {
        localStorage.removeItem('token')
          this.router.navigate(['/login']);
      }
      return isAuthenticated;
  }

  
}
