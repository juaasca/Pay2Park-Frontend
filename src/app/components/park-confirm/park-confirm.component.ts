import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { CurrentUserData } from 'src/app/data/current.user';
import { Tariff } from 'src/app/Domain/Tariff';
import { Park } from 'src/app/Domain/Park';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';
import { UserActions } from 'src/app/logic/user.actions.service';
import { AlertController, Platform, LoadingController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { TariffService } from 'src/app/services/dao/tariff.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Client } from 'src/app/Domain/Client';
import { async } from 'q';

@Component({
    selector: 'app-park-confirm',
    templateUrl: './park-confirm.component.html',
    styleUrls: ['./park-confirm.component.scss', '../../globalCSS/common.scss'],
})
export class ParkConfirmComponent implements OnInit {
    vehicles: Vehicle[];
    prueba: Park;
    fare: Tariff;
    calle: string;
    color: string;
    tariffs: Tariff[];
    tariff: Tariff;
    tieneBono: boolean;
    bonoTexto: string;
    bonoColor: string;
    vehiculo: Vehicle;
    tarifaFormGroup: FormGroup;
    popoverController: any;
    constructor(private router: Router,
        private tariffService: TariffService,
        private vehiclesService: VehiclesService,
        private userActions: UserActions,
        private alertController: AlertController,
        private platform: Platform,
        private loadingController: LoadingController,
        private localNotification: LocalNotifications) {
        this.vehicles = [];
        this.platform.ready().then(() => {
            this.localNotification.on('trigger').subscribe(res => {
                console.log('trigger: ', res);
                let msg = res.data ? res.data.mydata : '';
                this.showAlert(res.title, res.text, msg)
            });
        })
    }

    ngOnInit() {
        this.tieneBono = false;
        //this.userActions.registerVehicle(this.prueba.LicensePlate, this.prueba.Name,this.prueba.Description,this.prueba.OwnersEmail);
        this.vehiclesService.getEntitiesAsync().then(vehicles => this.vehiculosUsuario(vehicles)).then(() => this.vehiculo = this.vehicles[this.vehicles.length - 1]);
        this.tariffService.getEntitiesAsync().then((tariffs) => this.tariffs = tariffs.sort((a, b) => this.sortNameAscending(a, b))).then((tariffs) => this.tariff = this.tariffs[this.tariffs.length - 1]);
        if (CurrentUserData.FechaFinalizacion > Date.now()) { this.tieneBono = true; this.bonoColor = 'success'; this.bonoTexto = 'Tienes un bono activo incluye 120 min' } else { this.tieneBono = false; }
        let lon = CurrentUserData.CurrentPosition[0];
        let lat = CurrentUserData.CurrentPosition[1];
        this.simpleReverseGeocoding(lat, lon);
        this.bonoColor = CurrentUserData.color;
        this.color = CurrentUserData.color;
        setInterval(() => {
            this.color = CurrentUserData.color;
            if (this.tieneBono == false) { this.bonoColor = CurrentUserData.color; } else { this.bonoColor = 'success'; }
        }, 1000);

    }

    vehiculosUsuario(vehicles: Vehicle[]) {
        if (CurrentUserData.LoggedUser) {
            while (vehicles.length > 0) {
                let aux = vehicles.pop();
                if (aux.OwnerEmail == CurrentUserData.LoggedUser.Email) {
                    this.vehicles.push(aux);
                }
            }
        }
    }

    seleccionarVehiculo(v: Vehicle) {
        this.vehiculo = v;
    }

    aparcarVehiculo() {
        this.carga();
        if (this.tieneBono) { this.tariff = new Tariff(false, 'con bono', 999, 60); }
        this.vehiculo.Parked = true;
        this.vehiclesService.addEntityAsync(this.vehiculo.LicensePlate, this.vehiculo);
        if (CurrentUserData.CochesAparcados < 4 && CurrentUserData.EsMultiBono) {
            CurrentUserData.CochesAparcados++;
            this.anyadirCochesAparcados();
        }
        let id = this.userActions.newId(1);
        id.then(
            (result) => {
                console.log(result);
                this.prueba = new Park(result, this.vehiculo, CurrentUserData.CurrentStreet.split(',')[0], CurrentUserData.CurrentPosition, this.tariff, new Date().toString());
                CurrentParkingData.park = this.prueba;
                this.userActions.registerPark(this.prueba.id, this.prueba.Vehicle, this.prueba.Street, this.prueba.Coordinates, this.prueba.Fare);
                this.sendNotifications();
                CurrentParkingData.parks.push(this.prueba);
            }
        )

    }

    simpleReverseGeocoding(lon, lat) {
        fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(
            function (response) {
                return response.json();
            }).then(function (json) {
                let calle = json.display_name;
                CurrentUserData.CurrentStreet = calle;
            })
    }

    sendNotifications() {
        let today: Date = new Date();
        today.setMinutes(today.getMinutes() + 60 + 45); // Notificación que recibirá a cuando le queden 15 min de estacionamiento

        this.localNotification.schedule({
            id: 1,
            title: 'PRECAUCIÓN vehiculo estacionado',
            text: 'Le quedan 15 minutos para que llegue al máximo de tiempo posible para estacionar',
            trigger: { at: today }
        });

        today.setMinutes(today.getMinutes() + 10); // Notificación cuando quedan 5 minutos
        this.localNotification.schedule({
            id: 2,
            title: 'PRECAUCIÓN vehiculo estacionado',
            text: 'Le quedan 15 minutos para que llegue al máximo de tiempo posible para estacionar',
            trigger: { at: today }
        });

        today = new Date();
        today.setMinutes(today.getMinutes() + 30);

        this.localNotification.schedule({ // Notificación cada 30 minutos
            id: 3,
            title: "Lleva 30  minutos estacionado",
            trigger: {
                firstAt: today,
                in: 30,
                unit: ELocalNotificationTriggerUnit.MINUTE,

            }
        });

        setTimeout(() => this.localNotification.cancel(3), 2 * 3600 * 1000);
    }

    showAlert(header, sub, msg) {
        this.alertController.create({
            header: header,
            subHeader: sub,
            message: msg,
            buttons: ['Ok']
        }).then(alert => alert.present());
    }

    async carga() {
        const loading = await this.loadingController.create({
            message: 'Aparcando',
            duration: 2000
        });
        await loading.present();

        const { role, data } = await loading.onDidDismiss();



        if (!this.prueba.Fare.IsRealTime) {
            if (this.tieneBono) { this.router.navigateByUrl('main/notification'); } else {

                CurrentUserData.price = this.prueba.Fare.Price.toString(); this.router.navigateByUrl('payment');
            }
        } else {
            console.log(this.prueba.Fare.IsRealTime);

            this.router.navigateByUrl('main/notification');

        }
    }

    sortNameAscending(tariffA: Tariff, tariffB: Tariff) {
        var nameA = tariffA.Price, nameB = tariffB.Price
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
    }

    seleccionarTarifa(i) {
        this.tariff = i;
    }

    anyadirCochesAparcados() {
        var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, CurrentUserData.wallet, CurrentUserData.FechaFinalizacion, CurrentUserData.EsMultiBono, CurrentUserData.CochesAparcados);
        CurrentUserData.LoggedUser = user;
        this.userActions.updateBono(user);
    }

}
