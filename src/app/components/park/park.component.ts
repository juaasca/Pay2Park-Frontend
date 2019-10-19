import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';



declare let L;

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss'],
})
export class ParkComponent implements OnInit {

    private idWatch: any


  constructor(public alertController: AlertController, private router: Router) { }

  ngOnInit() {
    let map;
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };


    let actual = navigator.geolocation.getCurrentPosition((pos)=>{
         map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 16);
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }, () => {}, options)    
    
    this.idWatch = navigator.geolocation.watchPosition((position) => {
       
        let posicion = marker([position.coords.latitude, position.coords.longitude], {
            icon: icon({
              iconSize: [ 25, 41 ],
              iconAnchor: [ 13, 41 ],
              iconUrl: 'assets/leaflet/images/marker-icon.png',
              shadowUrl: 'assets/leaflet/images/marker-shadow.png'
            })
          }).addTo(map);
    }, () => {}, options)
    
  }

  async aparcar() {
    const alert = await this.alertController.create({
      header: '¿Desea aparcar aquí?',
      message: 'El máximo es de 2 horas' ,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Aparcar',
          handler: () => {
            this.crearAparcamiento();
          }
        }
      ]
    });

    await alert.present();
  }

  crearAparcamiento(){
    this.router.navigateByUrl('parkConfirm');
  }

}

