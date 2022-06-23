import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
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
          let roles = this.parseJwt(user.token).roles

          if (roles.indexOf('ROLE_ADMIN') !== -1) {
            console.log('user is admin!')
            localStorage.setItem('token',user.token)

          } else {console.log('user is not admin')}

        }
      })
    )
  }

  parseJwt(token:String) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

}