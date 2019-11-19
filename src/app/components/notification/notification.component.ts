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
export class NotificationComponent implements OnInit {
    
  park: Park;
  time: number;
  calle: string;
  color: string;
  max: number;
  constructor(public alertController: AlertController, private parkService: ParkService, private userActions: UserActions,
      private payPal: PayPal, private router: Router, private darkMode: DarkModeService, public alertControllerBono: AlertController
  ) { }

  precio = 2.3;

  ngOnInit() {
    this.time = 0;
    this.max = 120;
    this.color = CurrentUserData.color;
    this.comprobar();
    
    if (CurrentParkingData.park) {
        this.park = CurrentParkingData.park;
        this.time = this.park.getCurrentTime();
        this.calle = this.park.Street;
        this.max = this.park.Fare.Duration;
        if(this.park.Fare.IsRealTime){this.max = 120;}
    }
    this.calle = 'Todavia no has aparcado';
    setInterval(() => {
        this.color = CurrentUserData.color;
        this.actualizar();
    }, 1000);
  }

  actualizar() {
    if (CurrentParkingData.park) {
        this.park = CurrentParkingData.park;
        this.time = this.park.getCurrentTime();
        this.calle = this.park.Street;
        this.time = this.park.getCurrentTime();
        
        this.max = this.park.Fare.Duration;
        if(this.park.Fare.IsRealTime){this.max = 120;}
    } else {
        this.calle = 'Todavia no has aparcado';
        this.time = 0;
    }
  }

  async botonPagar() {
    if (CurrentParkingData.park) {
      this.precio = this.park.Fare.Price;
      if(this.park.Fare.IsRealTime){this.precio= this.park.Fare.Price * this.time;}
      this.comprobarBono();
      if(this.activo){
      this.bonoActivo();
      //this.confirmPagoBono();
     }else {
      const alert = await this.alertController.create({
        header: '¿Terminar Estacionamiento?',
            message: 'El precio es: ' + this.precio.toString() + ' por una duración de ' +this.time.toString() + ' minutos.',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                    console.log('Confirm Cancel');
                }
              }, {
                text: 'Finalizar',
                handler: () => {
                    this.confirmPagar();
                  }
                }
              ]
            });

        await alert.present();
    }} else {
      const alert = await this.alertController.create({
        header: 'Todavia no ha estacionado',
        buttons: [{
          text: 'OK',
            handler: () => {
              this.router.navigateByUrl('main/park');                
            }            
        }]
      });   
      
      await alert.present();     
    }
  }

  confirmPagar() {
    this.parkService.deleteEntityAsync(CurrentParkingData.park.id.toString());
    CurrentParkingData.park = null;
    if(this.park.Fare.IsRealTime){
    CurrentUserData.price = this.precio.toString();
    this.router.navigateByUrl('payment');
    }
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

  //Comprueba que el bono esta activo
  activo: boolean = false;
  comprobarBono(){
    console.log(CurrentUserData.DuracionBono);
    if(CurrentUserData.DuracionBono > Date.now()) this.activo = true;
    else this.activo = false;
  } 
  
  //Alerta de aviso de que el bono esta activo
  async bonoActivo() {
    const alertBono = await this.alertControllerBono.create({
      header: 'Ha usado su bono para estacionar',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.confirmPagoBono();
            this.router.navigateByUrl('main/park');
          }
        }
      ]
    });

    await alertBono.present();
  }

  //Elimina el registro de parking del usuario variable del codigo para confirmacion del bono
  confirmPagoBono() {
    this.parkService.deleteEntityAsync(CurrentParkingData.park.id.toString());
    CurrentParkingData.park = null;
    this.calle = 'Todavia no has aparcado';
    this.max = 120;
    this.time = 0;
    this.router.navigateByUrl('main/park');
  }

}