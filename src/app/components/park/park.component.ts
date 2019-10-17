import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { AlertController } from '@ionic/angular';



declare let L;

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss'],
})
export class ParkComponent implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
    const map = L.map('map').setView([39.482,-0.348], 16);
        
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
    let posicion = marker([39.482395, -0.348349], {
      icon: icon({
        iconSize: [ 25, 41 ],
        iconAnchor: [ 13, 41 ],
        iconUrl: 'assets/leaflet/images/marker-icon.png',
        shadowUrl: 'assets/leaflet/images/marker-shadow.png'
      })
    }).addTo(map);
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

  }

}

