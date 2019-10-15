import { Component, OnInit } from '@angular/core';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss'],
})
export class ParkComponent implements OnInit {

  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public googleMaps: GoogleMaps,
  ) { }

  ngOnInit() {}
    loadMap(){
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: 43.0741904, // default location
            lng: -89.3809802 // default location
          },
          zoom: 18,
          tilt: 30
        }
      };
    
      this.map = this.googleMaps.create('map_canvas', mapOptions);
    
      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        this.getPosition();
      })
      .catch(error =>{
        console.log(error);
      });
    }

    getPosition(): void{
      this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'My Position',
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error =>{
        console.log(error);
      });
    }
}
