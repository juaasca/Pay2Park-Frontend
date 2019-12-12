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
import { Vehicle } from 'src/app/Domain/Vehicle';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';
import { Client } from 'src/app/Domain/Client';
import { VehicleActionsService } from 'src/app/logic/vehicle.actions.service';
import { Transactions } from 'src/app/Domain/Transactions';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss', '../../globalCSS/common.scss'],
})
export class NotificationComponent implements OnInit {
  parks: Park[];
  parkedVehicles: Vehicle[] = [];
  park: Park;
  vehicle: Vehicle = new Vehicle('', '', '', '');
  time: number;
  calle: string;
  color: string;
  max: number;
  metodoPago: string;
  //Comprueba que el bono esta activo
  activo: boolean = false;

  constructor(public alertController: AlertController, private parkService: ParkService, private userActions: UserActions,
    private payPal: PayPal, private router: Router, private darkMode: DarkModeService, public alertControllerBono: AlertController,
    private vehicleActionsService: VehicleActionsService
  ) { }

  precio = 2.3;

  ngOnInit() {
    this.parks = CurrentParkingData.parks;
    this.parkService.getEntitiesAsync().then(parks => this.parksUsuario(parks));
    this.time = 0;
    this.max = 120;
    this.color = CurrentUserData.color;
    this.comprobar();

    if (CurrentParkingData.park) {
      this.park = CurrentParkingData.park;

      this.vehicleActionsService.getVehicleByPlate(this.park.VehiclePlate)
        .then((vehicle) => this.vehicle = vehicle);

      this.time = this.park.getCurrentTime();
      this.calle = this.park.Street;
      this.max = this.park.Fare.Duration;

      if (this.park.Fare.IsRealTime) {
        this.max = 120;
      }
    }

    this.calle = 'Todavia no has aparcado';
    setInterval(() => {
      this.color = CurrentUserData.color;
      this.actualizar();
    }, 100);
  }

  actualizar() {
    if (CurrentParkingData.park) {
      this.park = CurrentParkingData.park;
      this.time = CurrentParkingData.park.getCurrentTime();
      this.calle = this.park.Street;
      this.max = this.park.Fare.Duration;
      if (this.park.Fare.IsRealTime) { this.max = 120; }
    } else {
      this.calle = 'Todavia no has aparcado';
      this.time = 0;
    }
  }

  MetodoPago(event) {
    if (event.detail.value == 'Cartera') { this.metodoPago = event.detail.value }
    else this.metodoPago = event.detail.value
    console.log(this.metodoPago);
  }

  async botonPagar() {
    if (CurrentParkingData.park) {
      this.precio = this.park.Fare.Price;

      if (this.park.Fare.IsRealTime) {
        this.precio = this.park.Fare.Price * this.time;
      }

      this.comprobarBono();

      if (this.activo) {
        this.bonoActivo();
        //this.confirmPagoBono();
      } else {
        Math.round(this.precio * 100) / 100

        const alert = await this.alertController.create({
          header: '¿Terminar Estacionamiento?',
          message: 'El precio es: ' + this.precio.toString() + ' por una duración de ' + this.time.toString() + ' minutos.',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
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

      }
    } else {
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

  async confirmPagar() {
    this.parkService.deleteEntityAsync(CurrentParkingData.park.id.toString());

    let coche = await this.vehicleActionsService.getVehicleByPlate(CurrentParkingData.park.VehiclePlate);
    coche.Parked = false;

    this.vehicleActionsService.addVehicle(coche);

    CurrentParkingData.park = null;
    if (this.metodoPago == 'Cartera') {
      var nuevoSaldo = Number(CurrentUserData.wallet) - Number(this.precio);// CurrentUserData.wallet.value;
      var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, nuevoSaldo, CurrentUserData.FechaFinalizacion, CurrentUserData.EsMultiBono, CurrentUserData.CochesAparcados);
      CurrentUserData.LoggedUser = user;
      CurrentUserData.wallet = nuevoSaldo;
      this.userActions.updateWallet(user);

      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + ' ' + time;

      var transaccion = new Transactions(this.precio.toString(), dateTime, CurrentUserData.LoggedUser.Email, 'gastado en aparcar', 'cartera', 'cartera');
      this.userActions.addHistory(user, transaccion);
    } else {
      if (this.park.Fare.IsRealTime) {
        CurrentUserData.price = this.precio.toString();
        this.router.navigateByUrl('payment');
      }
    }
    this.parks.splice(this.parks.findIndex(x => x.id == this.park.id), 1);
    this.parkedVehicles.splice(this.parkedVehicles.findIndex(v => v === coche), 1);
  }

  comprobar() {
    if (CurrentUserData.LoggedUser) {
      const currentParks = CurrentParkingData.parks;

      while (currentParks.length > 0) {
        const park = currentParks.pop();

        this.vehicleActionsService.getVehicleByPlate(park.VehiclePlate)
          .then((vehicle) => {
            if (vehicle.OwnerEmail === CurrentUserData.LoggedUser.Email) {
              var endDate: number;

              if (!park.Fare.IsRealTime) {
                endDate = +park.InitialDate + +(park.Fare.Duration * 60000);
              }

              CurrentParkingData.park = new Park(park.id, park.VehiclePlate, park.Street, park.Coordinates, park.Fare, +park.InitialDate, +endDate);
            }
          })

      }
    }
  }

  comprobarBono() {
    if (CurrentUserData.FechaFinalizacion > Date.now()) {
      this.activo = true;
    } else {
      this.activo = false;
    }
  }

  //Alerta de aviso de que el bono esta activo
  async bonoActivo() {
    const alertBono = await this.alertControllerBono.create({
      header: 'Ha usado su bono para estacionar',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.confirmSubscriptionPayment();
            this.router.navigateByUrl('main/park');
          }
        }
      ]
    });

    await alertBono.present();
  }

  //Elimina el registro de parking del usuario variable del codigo para confirmacion del bono
  confirmSubscriptionPayment() {
    if (CurrentUserData.EsMultiBono) {
      CurrentUserData.CochesAparcados--;
      this.quitarCochesAparcados();
    }

    this.parkService.deleteEntityAsync(CurrentParkingData.park.id.toString());

    var coche: Vehicle;

    this.vehicleActionsService.getVehicleByPlate(CurrentParkingData.park.VehiclePlate)
      .then((vehicle) => coche = vehicle);

    coche.Parked = false;
    this.vehicleActionsService.addVehicle(coche);

    CurrentParkingData.park = null;
    this.parks.splice(this.parks.findIndex(x => x.id == this.park.id), 1);

    this.calle = 'Todavia no has aparcado';
    this.max = 120;
    this.time = 0;
    this.router.navigateByUrl('main/park');
  }

  parksUsuario(parks: Park[]) {
    let auxParks = [];
    if (CurrentUserData.LoggedUser) {
      while (parks.length > 0) {
        let park = parks.pop();
        this.vehicleActionsService.getVehicleByPlate(park.VehiclePlate)
          .then((vehicle) => {
            if (vehicle.OwnerEmail == CurrentUserData.LoggedUser.Email) {
              this.parks.push(park);
              this.parkedVehicles.push(vehicle);
            }
          });
      }
    }
  }

  seleccionarPark(vehicle: Vehicle) {
    this.park = this.parks.find((park) => park.VehiclePlate === vehicle.LicensePlate);;
    CurrentParkingData.park = new Park(null, null, null, null, null, null);
    CurrentParkingData.park.Coordinates = this.park.Coordinates;
    CurrentParkingData.park.InitialDate = this.park.InitialDate;
    CurrentParkingData.park.Fare = this.park.Fare;
    CurrentParkingData.park.Street = this.park.Street;
    CurrentParkingData.park.VehiclePlate = this.park.VehiclePlate;
    CurrentParkingData.park.id = this.park.id;
  }

  quitarCochesAparcados() {
    var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, CurrentUserData.wallet, CurrentUserData.FechaFinalizacion, CurrentUserData.EsMultiBono, CurrentUserData.CochesAparcados);
    CurrentUserData.LoggedUser = user;
    this.userActions.updateBono(user);
  }
}