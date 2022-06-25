import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {map} from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginUrl = 'http://localhost:8000/api/login_check'

  constructor(private http: HttpClient) { }

  login(email:String, password:String) {
    let user = {
      'username':email,
      'password':password
    }
    return this.http.post<any>(this._loginUrl, user).pipe(
      map((response: any) => {
        const user = response
        if (user) {

          if (this.isAdmin(user.token)) {
            console.log('user is admin!')
            localStorage.setItem('token',user.token)
           
          } else {console.log('user is not admin')}

        }
      })
    )
  }

  isLoggedIn() {
    let token = localStorage.getItem('token')

    if (token) {
      return this.isAdmin(token)
    }
    return false
  }

  isAdmin(token:String) {
    if (!token) {return false}

    let parsedToken = this.parseJwt(token)
    console.log(parsedToken)
    if (parsedToken.roles.indexOf('ROLE_ADMIN') !== -1) {
      return true
    }
    return false
  }

  isExpired(token : any) {
    let time = this.parseJwt(token).exp
    if (Date.now() >= time * 1000) {
      return true;
    }
    return false
  }

  parseJwt(token:String) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

}