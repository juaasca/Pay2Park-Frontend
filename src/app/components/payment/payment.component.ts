import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { CurrentUserData } from 'src/app/data/current.user';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { ParkService } from 'src/app/services/dao/parks.service';
import { Router } from '@angular/router';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent  implements OnInit{
  paymentAmount: string = '0.30';
  currency: string = 'EUR';
  currencyIcon: string = '€';
 
  ngOnInit(){
    this.color = CurrentUserData.color;
    this.paymentAmount = CurrentUserData.price;
    this.realizarPago();
    console.log(this.paymentAmount);
    setInterval(() => {
      this.color = CurrentUserData.color;
  }, 1000);
  }
  color:string;
  constructor(private router: Router,private payPal: PayPal, private darkMode: DarkModeService, private parkService: ParkService) {
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
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
            })
            .catch(err => {
              console.log(err);
            })
        }
      }).render('#paypal-button-container');
    }, 500)
  }
  atras(){
    this.router.navigateByUrl('main/notification');
  }
}


/*

//prueba suscripcion mensual


declare var paypal;  
@Component({  
  selector: 'app-payment',  
  templateUrl: './payment.component.html',  
  styleUrls: ['./payment.component.scss']  
})  
export class PaymentComponent implements OnInit {  
  @ViewChild('paypal') paypalElement: ElementRef;  
  constructor() { }  
  planId: any;  
  subcripId: any;  
  basicAuth = 'Basic QWNWUTBIX05QTVlWMDIzSDhMM3Y2alhNcDRVdaUN2V0M4Mmo4a19hodjdkdS14M3F4dFJ6Y2pNTnRPcGN6OUpPdjU1TW9jTllsEV1p5WURWNm46RUZJRWtJd0dYdDFJSTdFRmlEdVQ3UWExV2ZXWDZnYmw3Z2w5ajgwZVlsVjI1ODdfUTRHSUxCSWxZfOGg1SzRRZTFhMZU1yVgFZGRThIWXAyRjA=';  //Pass your ClientId + scret key
  
  ngOnInit() {     
    const self = this;  
    this.planId = 'P-20D52460DL479523BLV56M5Y';  //Default Plan Id
    paypal.Buttons({  
      createSubscription: function (data, actions) {  
        return actions.subscription.create({  
          'plan_id': self.planId,  
        });  
      },  
      onApprove: function (data, actions) {  
        console.log(data);  
        alert('You have successfully created subscription ' + data.subscriptionID);  
        self.getSubcriptionDetails(data.subscriptionID);  
      },  
      onCancel: function (data) {  
        // Show a cancel page, or return to cart  
        console.log(data);  
      },  
      onError: function (err) {  
        // Show an error page here, when an error occurs  
        console.log(err);  
      }  
  
    }).render(this.paypalElement.nativeElement);  
  
  }  
  // ============Start Get Subcription Details Method============================  
  getSubcriptionDetails(subcriptionId) {  
    const xhttp = new XMLHttpRequest();  
    xhttp.onreadystatechange = function () {  
      if (this.readyState === 4 && this.status === 200) {  
        console.log(JSON.parse(this.responseText));  
        alert(JSON.stringify(this.responseText));  
      }  
    };  
    xhttp.open('GET', 'https://api.sandbox.paypal.com/v1/billing/subscriptions/' + subcriptionId, true);  
    xhttp.setRequestHeader('Authorization', this.basicAuth);  
  
    xhttp.send();  
  }  
  // ============END Get Subcription Details Method========================  
  
}  */