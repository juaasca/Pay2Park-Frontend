import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { CurrentUserData } from 'src/app/data/current.user';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { ParkService } from 'src/app/services/dao/parks.service';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent  implements OnInit, OnDestroy{
  paymentAmount: string = '0.30';
  currency: string = 'EUR';
  currencyIcon: string = '€';
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
  ngOnInit(){
    this.suscription = this.darkMode.color.subscribe(color => {
      this.color = color;
    });
    this.paymentAmount = CurrentUserData.price;

  }
  color:string;
  suscription: Subscription;
  constructor(private payPal: PayPal, private darkMode: DarkModeService, private parkService: ParkService) {
    
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
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
            })
            .catch(err => {
              console.log(err);
            })
        }
      }).render('#paypal-button-container');
    }, 500)
  }


  payWithPaypal() {
    console.log("Pay ????");
    this.payPal.init({
      PayPalEnvironmentProduction: '',
      PayPalEnvironmentSandbox: 'ASYqq-Tmw9Ug1ogXOuX3OtykohApnjEAtnP_lZGOJYfv4wRaxEdjFthHCo6_K02tzn6PgBSd9uGzMQNl'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
}