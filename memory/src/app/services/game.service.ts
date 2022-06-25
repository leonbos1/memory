import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  formatDate(data : any) {
    for (let i = 0; i < data.length; i++) {
      let dateObject = new Date(data[i].date)
      let time = dateObject.toTimeString().substr(0,8)
      let date = dateObject.toDateString().substr(0,10)

      data[i].date = date
      data[i].time = time
    }
  }


}
