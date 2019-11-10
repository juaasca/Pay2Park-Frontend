import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Park } from '../../Domain/Park';
import { CurrentUserData } from 'src/app/data/current.user';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { UserActions } from 'src/app/logic/user.actions.service';
import { ParkService } from 'src/app/services/dao/parks.service';
import { PaymentComponent } from '../payment/payment.component';
import { ProviderAstType } from '@angular/compiler';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Router } from '@angular/router';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  park: Park;
  time: number;
  calle: string;
  color: string;
  suscription: Subscription;
  constructor(public alertController: AlertController, private parkService: ParkService, private userActions: UserActions,
              private payPal: PayPal,  private router: Router, private darkMode: DarkModeService
    ) {
  }
  precio = 2.3;

  ngOnInit() {
    this.time = 0;
    this.comprobar();
    this.suscription = this.darkMode.color.subscribe(color => {
      this.color = color;
    });
    if (CurrentParkingData.park) {
    this.park = CurrentParkingData.park;
    this.time = this.park.getCurrentTime();
    this.calle = this.park.Street;
    }
    this.calle = 'Todavia no has aparcado';
    setInterval(() => {
      this.actualizar();
  }, 1000);
  }
ngOnDestroy() {
  this.suscription.unsubscribe();
}

  actualizar() {
    if (CurrentParkingData.park) {
      this.park = CurrentParkingData.park;
      this.time = this.park.getCurrentTime();
      this.calle = this.park.Street;
      this.time = this.park.getCurrentTime();
      this.precio = 1 + 0.20 * this.time;
      } else {
        this.calle = 'Todavia no has aparcado';
        this.time = 0;
      }
  }

  async botonPagar() {
    if (CurrentParkingData.park) {
    const alert = await this.alertController.create({
      header: '¿Terminar Estacionamiento?',
      message: 'El precio sera de: ' + this.precio.toString(),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
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
  } else {
    const alert = await this.alertController.create({
      header: 'Todavia no ha estacionado',
      buttons: [{
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('main/park');
          }
        }
      ]
    });

    await alert.present();
  }
  }

  confirmPagar() {
    this.parkService.deleteEntityAsync(CurrentParkingData.park.id.toString());
    CurrentParkingData.park = null;
    CurrentUserData.price = this.precio.toString();
    this.router.navigateByUrl('payment');
  }

  comprobar() {
   // if(CurrentParkingData.park && CurrentParkingData.park.Vehicle.OwnersEmail[0]===CurrentUserData.LoggedUser.Email){return true;}
    if (CurrentUserData.LoggedUser) {
      const aux1 = CurrentParkingData.parks;
      while (aux1.length > 0) {
        const aux = aux1.pop();
        if (aux.Vehicle.OwnersEmail[0] === CurrentUserData.LoggedUser.Email) {
          CurrentParkingData.park = new Park(aux.id, aux.Vehicle, aux.Street, aux.Coordinates, aux.Fare, new Date(aux.Date).toString());
        }
      }
    }
  }
}
