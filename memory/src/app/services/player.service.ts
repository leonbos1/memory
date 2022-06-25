import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  giveIds(players : any) {
    for (let i = 1; i < players.length; i++) {
      players[i].id = i
    }
  }
  
}