import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PlayerService } from '../services/player.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {


  allPlayers: any = [];
  playerid: number;

  constructor(private playerService : PlayerService, private http: HttpClient, private router: Router) {
    this.playerid = 0
   }

  ngOnInit(): void {
    this.players()
  
  }

  players() : void {
    this.http.get<any>('http://localhost:8000/api/players').subscribe(data => {
        this.allPlayers = data['hydra:member']
    })    
  } 

  delete(id : number) {
    this.http.delete<any>(`http://localhost:8000/api/players/${id}`).subscribe(data => {
    })
    this.players()
  }

}
