import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''

  constructor(private _auth: AuthService,  private router: Router) { }

  ngOnInit(): void {
  
    }
    

  login() {

    const loginObserver = {
      next: (x: any) => this.router.navigate(['/']),
      error: (err: any) => console.log(err)
    }

    this._auth.login(this.email, this.password).subscribe(loginObserver)
  
  }


  back() {
    document.location.href='http://127.0.0.1:5500/login.html'
  }

 
}