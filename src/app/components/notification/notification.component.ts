import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Park } from '../../Domain/Park';
import { CurrentUserData } from 'src/app/data/current.user';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { UserActions } from 'src/app/logic/user.actions.service';
import { ParkService } from 'src/app/services/dao/parks.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  park: Park;
  time: number;
  calle: string;
  constructor(public alertController: AlertController, private parkService: ParkService) { }
  precio = 2.3;
  ngOnInit() {
    if(CurrentParkingData.park){
    this.park = CurrentParkingData.park;
    this.time = this.park.getCurrentTime();
    this.calle = this.park.Street;
    }
    this.calle = 'Todavia no has aparcado';
    setInterval(() => {
      this.actualizar();
  }, 1000);
  }


  actualizar() {
    if(CurrentParkingData.park){
      this.park = CurrentParkingData.park;
      this.time = this.park.getCurrentTime();
      this.calle = this.park.Street;
      this.time = this.park.getCurrentTime();
      }
  }

  async botonPagar() {
    const alert = await this.alertController.create({
      header: '¿Terminar Estacionamiento?',
      message: 'El precio sera de: ' + this.precio,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Pagar',
          handler: () => {
            this.confirmPagar();
          }
        }
      ]
    });

    await alert.present();
  }

  confirmPagar() {
    this.parkService.deleteEntity(CurrentParkingData.park.id.toString());
    console.log(this.park.getCurrentTime());
  }

}
