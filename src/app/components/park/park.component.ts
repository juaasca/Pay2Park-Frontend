import { Component, OnInit } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CurrentUserData } from 'src/app/data/current.user';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { Park } from 'src/app/Domain/Park';



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
    let existe = this.comprobar();
    if(existe){
      this.errorAparcar();
    }else{
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
  }

  async errorAparcar(){
    const alert = await this.alertController.create({
      header: 'Ya ha aparcado',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('main/notification');
          }
        }
      ]
    });

    await alert.present();
  }

  crearAparcamiento(){
    this.router.navigateByUrl('parkConfirm');
  }

  comprobar(){
    if(CurrentParkingData.park && CurrentParkingData.park.Vehicle.OwnersEmail[0]===CurrentUserData.LoggedUser.Email){return true;}
    if(CurrentUserData.LoggedUser){
      let aux1 = CurrentParkingData.parks;
      while (aux1.length > 0){
        let aux = aux1.pop();
        if(aux.Vehicle.OwnersEmail[0] === CurrentUserData.LoggedUser.Email){
          CurrentParkingData.park = new Park(aux.id, aux.Vehicle, aux.Street, aux.Coordinates, aux.Fare, aux.Minutes);
          return true;
        }
      }
  }
  }
}
