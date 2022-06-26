import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { PlayersComponent } from '../players/players.component';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  allGames : any

  constructor(private gameService : GameService, private http: HttpClient, private router: Router) {
   }

  ngOnInit(): void {
    this.games()
  }

  games() : void {
      this.http.get<any>(`http://localhost:8000/api/games`).subscribe(data=> {
        this.gameService.formatDate(data['hydra:member'])
        
        this.allGames = this.gameService.get10RecentGames(data['hydra:member'])
  
        })    
        
        
  } 


}
