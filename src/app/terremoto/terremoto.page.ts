import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet'
@Component({
  selector: 'app-terremoto',
  templateUrl: './terremoto.page.html',
  styleUrls: ['./terremoto.page.scss'],
  standalone: false
})
export class TerremotoPage {
  constructor(private route: ActivatedRoute) { }

  ionViewDidEnter() {
    const lat = this.route.snapshot.paramMap.get("latitud");
    const lon = this.route.snapshot.paramMap.get("longitud");
    const mag = this.route.snapshot.paramMap.get("magnitud");
    const details = this.route.snapshot.paramMap.get("detalles");
    this.initMap(lat, lon, mag, details);
  }


  private initMap(lat: any, lon: any, mag: any, details: any): void {
    var greenIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: '',
  
      iconSize:     [35, 48], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
    const map = L.map('map').setView( [lon, lat], 13);
    map.on("load", function(){
      setTimeout(() => {
        map.invalidateSize();
      }, 10)
    })
    var marker = L.marker([lon, lat], {icon: greenIcon}).addTo(map) // "Kyiv" is the accessible name of this marker
      .bindPopup("Aqui fue el lugar del terremoto con una magnitud de:" + mag + "mas info" + details);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

  }
  
}
