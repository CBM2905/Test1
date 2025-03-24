import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
@Component({
  selector: 'app-terremoto',
  templateUrl: './terremoto.page.html',
  styleUrls: ['./terremoto.page.scss'],
  standalone: false
})
export class TerremotoPage implements OnInit {

  constructor() { }

  ngOnInit() {  
    this.initMap();
  }


  private initMap(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

  }

}
