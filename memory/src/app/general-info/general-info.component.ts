import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {

  playerCount : any
  gamesCount : any
  apis : any

  constructor(private http: HttpClient) { }

  getInfo() {
    this.http.get<any>('http://localhost:8000/api/admin/aggregate').subscribe(data => {
        this.gamesCount = data[0].aantal_spellen
        this.playerCount = data[1].aantal_spelers
        this.apis = data[2]
        console.log(data)
    })  
  }

  ngOnInit(): void {
    this.getInfo()
  }

}
