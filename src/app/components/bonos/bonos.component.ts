import { Component, OnInit, ViewChild } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { CurrentUserData } from 'src/app/data/current.user';
import { IonSegment, AlertController } from '@ionic/angular';

declare var paypal;

@Component({
  selector: 'app-bonos',
  templateUrl: './bonos.component.html',
  styleUrls: ['./bonos.component.scss']
})
export class BonosComponent {

  constructor(private payPal: PayPal) {
    
    let _this = this;
    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      paypal.Buttons({

        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: _this.paymentAmount2
              }
            }]
          });
        },

        // Finalize the transaction
        onApprove: function (data, actions) {
          return actions.order.capture()
            .then(function (details) {

              // Show a success message to the buyer
              _this.PagadoPorBono = parseInt(_this.paymentAmount2);
              alert(details.payer.name.given_name + ' has realizado la compra con éxito');

              // 86400000 Son los milisegundos que trascurren durante un dia
              if (_this.PagadoPorBono == 5) CurrentUserData.DuracionBono = Date.now() + 86400000;
              else if (_this.PagadoPorBono == 15) CurrentUserData.DuracionBono = Date.now() + (86400000 * 7);
              else if (_this.PagadoPorBono == 40)  CurrentUserData.DuracionBono = Date.now() + (86400000 * 30);
              console.log( + CurrentUserData.DuracionBono );
            })
            .catch(err => {
              console.log(err);
            })
        }

      }).render('#paypal-button-container-Bonos');
    }, 500)
  }
  
  PagadoPorBono = 0;
  paymentAmount2: string; 

  //Dinero a pagar
  diarioClick(ev: any) {
    this.paymentAmount2 = '5';
    console.log( + CurrentUserData.DuracionBono );
  }
  semanalClick(ev: any) {
    this.paymentAmount2 = '15';
    console.log( + CurrentUserData.DuracionBono );
  }
  mensualClick(ev: any) {
    this.paymentAmount2 = '40';
    console.log( + CurrentUserData.DuracionBono );
  }
  borrarClick(ev: any){
    CurrentUserData.DuracionBono = 0;
    console.log( + CurrentUserData.DuracionBono );
  }  
  
  currency: string = 'EUR';
  currencyIcon: string = '€';

}

