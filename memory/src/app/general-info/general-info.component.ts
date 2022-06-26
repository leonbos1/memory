import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Chart, registerables } from 'chart.js'
Chart.register(...registerables);

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {

  playerCount : any
  gamesCount : any
  apis : any

  constructor(private http: HttpClient, private elementRef : ElementRef) { }

  getInfo() {

    this.http.get<any>('http://localhost:8000/api/admin/aggregate').subscribe(data => {
        this.gamesCount = data[0].aantal_spellen
        this.playerCount = data[1].aantal_spelers
        this.apis = data[2]
        this.chart()
    })  
  }

  ngOnInit(): void {
    this.getInfo()
  }

  chart() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#apiChart`);

    var labels = []
    var apiUses = []

    let colors = []

    for (let i = 0; i < this.apis.length; i++) {
      if (this.apis[i].api ==='') {this.apis[i].api = 'None'}
      labels.push(this.apis[i].api)
      apiUses.push(this.apis[i].aantal)
    }
    const myChart = new Chart(htmlRef, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: '# apis',
          data: apiUses,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(5, 99, 132, 0.2)',
            'rgba(255, 99, 5, 0.2)',
            'rgba(150, 100, 130, 0.2)',
            'rgba(5, 150, 200, 0.4)',
            'rgba(255, 99, 5, 0.2)',
            'rgba(0, 0, 255, 0.2)',
            'rgba(0, 255, 0, 0.2)',
            'rgba(255, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
