import { Component, OnInit, OnDestroy } from '@angular/core';
import { icon, latLng, marker, polyline, tileLayer } from 'leaflet';
import { Router } from '@angular/router';
import { CurrentUserData } from 'src/app/data/current.user';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { Park } from 'src/app/Domain/Park';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { AlertController, Platform, LoadingController } from '@ionic/angular';
import { Subscription } from 'src/app/Domain/Subscription';

declare let L;

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.scss', '../../globalCSS/common.scss'],
})
export class ParkComponent implements OnInit {
  private subscription: Subscription;
  private idWatch: any;
  color: string;
  constructor(public alertController: AlertController, private router: Router, private darkMode: DarkModeService, private localNotification: LocalNotifications,private platform:Platform,
    ) {
    this.platform.ready().then(() => {
      this.localNotification.on('trigger').subscribe(res => {
          console.log('trigger: ', res);
          let msg = res.data ? res.data.mydata : '';
          this.showAlert(res.title, res.text, msg)
      });
  })
  }
  posicion: [number, number];
  ngOnInit() {

    //this.subscription = CurrentUserData.subscription;
    this.subscription = new Subscription("prueba", 23,2,true);
    this.comprobar1HoraBono();
    this.posicion = [39.482765, -0.346754];
    this.comprobar();
    this.color = CurrentUserData.color;
    let map;
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    //const actual = navigator.geolocation.getCurrentPosition((pos) => {
    map = L.map('map').setView(this.posicion, 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    //}, () => {}, options);

    // this.idWatch = navigator.geolocation.watchPosition((position) => {

    const posicion = marker(this.posicion, {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/leaflet/images/marker-icon.png',
        shadowUrl: 'assets/leaflet/images/marker-shadow.png'
      })
    }).addTo(map);
    CurrentUserData.CurrentPosition = this.posicion;
    // }, () => {}, options);

    if (CurrentParkingData.parkPosition != undefined) {
      this.idWatch = navigator.geolocation.watchPosition((position) => {

        const posicion = marker(this.posicion, {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/leaflet/images/marker-rojo.png',
            shadowUrl: 'assets/leaflet/images/marker-shadow.png'
          })
        }).addTo(map);
        CurrentUserData.CurrentPosition = this.posicion;
      }, () => { }, options);


    }

    setInterval(() => {
      this.color = CurrentUserData.color;
    }, 1000);

  }

  // Comprueba que tengas un bono activo
  activo: boolean = false;
  comprobarBono() {
    if (CurrentUserData.FechaFinalizacion > Date.now()) { this.activo = true; }
    else this.activo = false;
  }

  restanteTiempoBono: number;
  min: number;
  horas: number;
  dias: number;
  mensaje: string

  // Recuperar y calcular el tiempre restante del bono
  conversorHoras() {
    this.restanteTiempoBono = CurrentUserData.FechaFinalizacion - Date.now();

    this.dias = Number((this.restanteTiempoBono / (1000 * 60 * 60 * 24)).toFixed()) - 1;
    this.horas = Number(((this.restanteTiempoBono / (1000 * 60 * 60)) % 24).toFixed()) -1;
    this.min = Number(((this.restanteTiempoBono / (1000 * 60)) % 60).toFixed());
  }

  // Dependiendo de si hay mas de un dia restante en el bono mostrara los dias o no
  selectorMensaje(){
    if (this.dias > 0) {
      this.mensaje = ('El máximo es de 2 horas, a su bono le quedan ' + this.dias + ' días ' + this.horas + ' horas y ' + this.min + ' minutos')
    } else this.mensaje = ('El máximo es de 2 horas, a su bono le quedan ' + this.horas + ' horas y ' + this.min + ' minutos');
  }

  async aparcar() {
    const existe = this.comprobar();
    this.comprobarBono();
    if (existe && !CurrentUserData.EsMultiBono) {
      this.errorAparcar();
    } else {
      if (this.activo) {

        if(CurrentUserData.EsMultiBono){

          if(CurrentUserData.CochesAparcados<4){
          this.conversorHoras();
          this.selectorMensajeMulti();

          const alert = await this.alertController.create({
          header: '¿Desea aparcar aquí?',
          message: (this.mensaje),
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
      }else this.alertaNoCochesDisponibles();
        } else {

        this.conversorHoras();
        this.selectorMensaje();

        const alert = await this.alertController.create({
          header: '¿Desea aparcar aquí?',
          message: (this.mensaje),
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

        await alert.present();}
      } else {
        const alert = await this.alertController.create({
          header: '¿Desea aparcar aquí?',
          message: 'El máximo es de 2 horas',
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
  }

  async errorAparcar() {
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

  crearAparcamiento() {
    CurrentParkingData.parkPosition = CurrentUserData.CurrentPosition;
    this.router.navigateByUrl('parkConfirm');
  }

  comprobar1HoraBono(){
   let tiempo: Date = new Date();
    tiempo.setMilliseconds(100);
    if(this.activo){
      this.conversorHoras();
      if(this.min == 60){
        this.localNotification.schedule({
          id: 1,
          title: 'Finalizacion de bono',
          text: 'Le queda una hora para que finalice el bono',
          trigger: { at : tiempo }
        });
      }
    }
  }

  showAlert(header, sub, msg) {
    this.alertController.create({
        header: header,
        subHeader: sub,
        message: msg,
        buttons: ['Ok']
    }).then(alert => alert.present());
}
  comprobar() {
    if (CurrentParkingData.park && CurrentParkingData.park.Vehicle.OwnerEmail === CurrentUserData.LoggedUser.Email) {return true; }
    if (CurrentUserData.LoggedUser) {
      const aux1 = CurrentParkingData.parks;
      while (aux1.length > 0) {
        const aux = aux1.pop();
        if (aux.Vehicle.OwnerEmail === CurrentUserData.LoggedUser.Email) {
          CurrentParkingData.park = new Park(aux.id, aux.Vehicle, aux.Street, aux.Coordinates, aux.Fare, new Date(aux.Date).toString());
          CurrentParkingData.parkPosition = aux.Coordinates;
          return true;
        }
      }
    }
  }

  selectorMensajeMulti(){
    if (this.dias > 0) {
      this.mensaje = ('El máximo es de 2 horas, a su bono le quedan ' + this.dias + ' días ' + this.horas + ' horas y ' + this.min + ' minutos, ademas todavia puede estacionar ' + (4- CurrentUserData.CochesAparcados) + ' vehiculo(s)')
    } else this.mensaje = ('El máximo es de 2 horas, a su bono le quedan ' + this.horas + ' horas y ' + this.min + ' minutos, ademas todavia puede estacionar ' + (4- CurrentUserData.CochesAparcados) + ' vehiculo(s)');
  }

  async alertaNoCochesDisponibles(){
    const alert = await this.alertController.create({
      header: ('Atencion'),
      message: ('No puede utilizar más este bono hasta que uno de los vehículos deje de estar aparcado'),
      buttons: [
        {
          text: 'Ok',
          cssClass: 'secondary',
          handler: () => {
            console.log('Comprendido');
          }
        
        }
      ]
    });

    await alert.present();
  }
}
