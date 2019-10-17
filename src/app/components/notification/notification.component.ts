import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Park } from '../../Domain/Park';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  park: Park;
  time: number;
  calle: string;
  constructor(public alertController: AlertController) { }
  precio = 2.3;
  ngOnInit() {
    this.park = new Park(1, null, 'Calle Zaragoza', null, null);
    this.time = this.park.getCurrentTime();
    this.calle = this.park.Street;
    setInterval(() => {
      this.actualizar();
  }, 1000);
  }


  actualizar() {
    this.time = this.park.getCurrentTime();
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
    console.log(this.park.getCurrentTime());
  }

}
