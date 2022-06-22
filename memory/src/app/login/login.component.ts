import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  
    }
    

  login() {
    this._auth.login(this.email, this.password)
    .subscribe(
      response => console.log(response),
      err => console.log(err)
    )
  
  }

  back() {
    document.location.href='http://127.0.0.1:5500/login.html'
  }

 
}