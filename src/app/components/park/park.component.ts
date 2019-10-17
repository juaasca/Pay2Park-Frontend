import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';



declare let L;

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss'],
})
export class ParkComponent implements OnInit {

    private idWatch: any

  constructor() { }

  ngOnInit() {
    const map = L.map('map').setView([39.482,-0.348], 16);
        
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    this.idWatch = navigator.geolocation.watchPosition((position) => {
        let posicion = marker([position.coords.latitude, position.coords.longitude], {
            icon: icon({
              iconSize: [ 25, 41 ],
              iconAnchor: [ 13, 41 ],
              iconUrl: 'assets/leaflet/images/marker-icon.png',
              shadowUrl: 'assets/leaflet/images/marker-shadow.png'
            })
          }).addTo(map);
    })
    
  }

  aparcar(){
    
  }

}

