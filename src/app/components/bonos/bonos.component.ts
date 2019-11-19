import { Component, OnInit, ViewChild } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { CurrentUserData } from 'src/app/data/current.user';
import { IonSegment, AlertController } from '@ionic/angular';
import { Client } from 'src/app/Domain/Client';
import { UserActions } from 'src/app/logic/user.actions.service';
import { Router } from '@angular/router';

declare var paypal;

@Component({
  selector: 'app-bonos',
  templateUrl: './bonos.component.html',
  styleUrls: ['./bonos.component.scss']
})
export class BonosComponent implements OnInit {
  color: string;

  constructor(private payPal: PayPal, private userActions: UserActions, private router: Router, public alertControllerConfirm: AlertController) {

    this.color = CurrentUserData.color;
    setInterval(() => {
      this.color = CurrentUserData.color;
    }, 1000);
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

              // Alerta de pago realizado correctamente
              _this.PagadoPorBono = parseInt(_this.paymentAmount2);
              _this.bonoActivo();

              // 86400000 Son los milisegundos que trascurren durante un dia
              if (_this.PagadoPorBono == 5) CurrentUserData.DuracionBono = Date.now() + 86400000;
              else if (_this.PagadoPorBono == 15) CurrentUserData.DuracionBono = Date.now() + (86400000 * 7);
              else if (_this.PagadoPorBono == 40)  CurrentUserData.DuracionBono = Date.now() + (86400000 * 30);
              console.log( + CurrentUserData.DuracionBono );
              
              var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, CurrentUserData.wallet, CurrentUserData.DuracionBono);
              CurrentUserData.LoggedUser = user;
              _this.userActions.updateBono(user);

            })
            .catch(err => {
              console.log(err);
            })
        }

      }).render('#paypal-button-container-Bonos');
    }, 500)
  }
  
  ngOnInit(){
    setInterval(() => {
      this.color = CurrentUserData.color;
    }, 1000);
  }

  PagadoPorBono = 0;
  paymentAmount2: string;
  check: boolean = false;

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

  // Metodo para añadir los bonos a la base de datos
  anyadirBono(){
    var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, CurrentUserData.wallet, CurrentUserData.DuracionBono);
    CurrentUserData.LoggedUser = user;
    this.userActions.updateBono(user);
  }

  // Alerta pago realizado con exito
  async bonoActivo() {
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
  
  currency: string = 'EUR';
  currencyIcon: string = '€';

}

