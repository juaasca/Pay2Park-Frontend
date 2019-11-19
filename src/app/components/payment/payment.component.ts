import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { CurrentUserData } from 'src/app/data/current.user';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { ParkService } from 'src/app/services/dao/parks.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
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
  constructor(private router: Router, private payPal: PayPal, private darkMode: DarkModeService, private parkService: ParkService, public alertControllerConfirm: AlertController) {
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
              _this.pagadoAlert();
            })
            .catch(err => {
              console.log(err);
            })
        }
      }).render('#paypal-button-container');
    }, 500)
  }
  atras() {
    this.router.navigateByUrl('main/notification');
  }

  async pagadoAlert() {
    const alertBono = await this.alertControllerConfirm.create({
      header: 'Pago realizado con éxito',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigateByUrl('main/park');
          }
        }
      ]
    });

    await alertBono.present();
  }

}
