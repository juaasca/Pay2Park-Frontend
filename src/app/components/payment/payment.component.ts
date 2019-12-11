import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { CurrentUserData } from 'src/app/data/current.user';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { ParkService } from 'src/app/services/dao/parks.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Transactions } from 'src/app/Domain/Transactions';
import { UserActions } from 'src/app/logic/user.actions.service';
import { Client } from 'src/app/Domain/Client';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss', '../../globalCSS/common.scss']
})
export class PaymentComponent implements OnInit {
  paymentAmount: string = '0.30';
  currency: string = 'EUR';
  currencyIcon: string = '€';

  ngOnInit() {
    this.color = CurrentUserData.color;
    this.paymentAmount = CurrentUserData.price;
    this.realizarPago();
    console.log(this.paymentAmount);
    setInterval(() => {
      this.color = CurrentUserData.color;
    }, 1000);
  }
  color: string;
  constructor(private userActions: UserActions,
    private router: Router, private location: Location, private payPal: PayPal, private darkMode: DarkModeService, private parkService: ParkService, public alertControllerConfirm: AlertController) {
  }

  realizarPago() {
    let _this = this;
    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      paypal.Buttons({

        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: _this.paymentAmount
              }
            }]
          });
        },

        // Finalize the transaction
        onApprove: function (data, actions) {
          return actions.order.capture()
            .then(function (details) {

              // Show a success message to the buyer
              var today = new Date();
              var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var dateTime = date + ' ' + time;
              //Cuando haya denuncias, en 'nocartera' habra que poner o eso o denuncia
              var transaction = new Transactions(_this.paymentAmount.toString(), dateTime, CurrentUserData.LoggedUser.Email, 'gastado', 'nocartera', CurrentUserData.motivo);
              var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, CurrentUserData.wallet, CurrentUserData.FechaFinalizacion, CurrentUserData.EsMultiBono, CurrentUserData.CochesAparcados);
              _this.userActions.addHistory(user,transaction);
              _this.pagadoAlert();
              _this.location.back();
            })
            .catch(err => {
              console.log(err);
            })
        }
      }).render('#paypal-button-container');
    }, 500)
  }
  atras() {
    //this.location.back();
    this.router.navigateByUrl('main/notification');
  }

  async pagadoAlert() {
    const alertBono = await this.alertControllerConfirm.create({
      header: 'Pago realizado con éxito',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //this.router.navigateByUrl('main/park');
          }
        }
      ]
    });

    await alertBono.present();
  }

}
