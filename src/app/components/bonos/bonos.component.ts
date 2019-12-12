import { Component, OnInit, ViewChild } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { CurrentUserData } from 'src/app/data/current.user';
import { IonSegment, AlertController, PickerController } from '@ionic/angular';
import { Client } from 'src/app/Domain/Client';
import { UserActions } from 'src/app/logic/user.actions.service';
import { Router } from '@angular/router';
import { Subscription } from 'src/app/Domain/Subscription';
import { SubscriptionService } from 'src/app/services/dao/subscription.service';
import { SubscriptionsActionsService } from 'src/app/logic/subscriptions.actions.service';
import { PickerOptions } from '@ionic/core';
import { Transactions } from 'src/app/Domain/Transactions';

declare var paypal;

@Component({
  selector: 'app-bonos',
  templateUrl: './bonos.component.html',
  styleUrls: ['./bonos.component.scss', '../../globalCSS/common.scss']
})
export class BonosComponent implements OnInit {

  color: string;
  TodosLosBonos: Subscription[];
  BonosSimple: Subscription[];
  BonosMulti: Subscription[];
  BonosAMostrar: Subscription[];
  BonoSeleccionado: Subscription;
  columnas: string;

  constructor(private payPal: PayPal, private userActions: UserActions,
    private router: Router, public alertControllerConfirm: AlertController,
    public subscriptionService: SubscriptionService, public pickerController: PickerController) {

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
              CurrentUserData.FechaFinalizacion = Date.now() + (86400000 * _this.BonoSeleccionado.DurationInDays);
              CurrentUserData.EsMultiBono = _this.BonoSeleccionado.IsMultiCar;
              CurrentUserData.CochesAparcados = 0;
              _this.anyadirBono();
              _this.anyadirHistorial();

            })
            .catch(err => {
            })
        }

      }).render('#paypal-button-container-Bonos');
    }, 500)
  }

  currency: string = 'EUR';
  currencyIcon: string = '€';
  PagadoPorBono = 0;
  paymentAmount2: string = '0';
  
  ngOnInit(){

    this.subscriptionService.getEntitiesAsync().then((TodosLosBonos) => this.TodosLosBonos = TodosLosBonos.sort((a, b) => this.sortSubscriptionByDuration(a, b)));
    setInterval(() => {
      this.color = CurrentUserData.color;
    }, 1000);
  }

  crearlistaBonosSimples(){
    this.BonosAMostrar = this.TodosLosBonos.filter(a => (a.IsMultiCar == false));
  }

  crearlistaBonosMulti(){
    this.BonosAMostrar = this.TodosLosBonos.filter(a => a.IsMultiCar);
  }

    // Metodo para añadir los bonos a la base de datos
    anyadirBono(){
      var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, CurrentUserData.wallet, CurrentUserData.FechaFinalizacion, CurrentUserData.EsMultiBono, CurrentUserData.CochesAparcados);
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

  // Tipo de bono seleccionado
  Cambiando(event){
    this.BonoSeleccionado = this.BonosAMostrar.find(bono => bono.Name == event.detail.value);
    this.paymentAmount2 = this.BonoSeleccionado.Price.toString();
  }

  //Bono seleccionado
  TipoSeleccionado(event){
    this.paymentAmount2 = '0';
    if(event.detail.value == 'Individual') this.crearlistaBonosSimples();
    else this.crearlistaBonosMulti();
  }

  sortSubscriptionByDuration(first: Subscription, second: Subscription) {
    var firstDuration = first.DurationInDays;
    var secondDuration = second.DurationInDays;

    if (firstDuration < secondDuration) {
      return -1;
    } else if (firstDuration > secondDuration) {
      return 1;
    } else {
      return 0;
    }
  }

  // DURANTE PRUEBAS permite borrar tu registro de bonos
  borrarClick(ev: any){
    CurrentUserData.FechaFinalizacion = 0;
    CurrentUserData.EsMultiBono = false;
  } 

  anyadirHistorial(){
    var today = new Date();
              var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
              var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              var dateTime = date + ' ' + time;
              var transaction = new Transactions(this.paymentAmount2.toString(), dateTime, CurrentUserData.LoggedUser.Email, 'gastado', 'nocartera', 'compra de bono');
              var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, CurrentUserData.wallet, CurrentUserData.FechaFinalizacion, CurrentUserData.EsMultiBono, CurrentUserData.CochesAparcados);
              this.userActions.addHistory(user,transaction);
  }
}

