import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  tiempoRestante = 20;
  calle = "Calle Zaragoza";
  constructor(public alertController: AlertController) { }
  precio= 2.3;
  ngOnInit() {}

  async botonPagar(){
    const alert = await this.alertController.create({
      header: '¿Terminar Estacionamiento?',
      message: 'El precio sera de: '+ this.precio,
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
  
  confirmPagar(){
    console.log("Pagar")
  }

}
