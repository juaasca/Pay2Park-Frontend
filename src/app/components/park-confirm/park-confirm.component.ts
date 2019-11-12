import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { CurrentUserData } from 'src/app/data/current.user';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { Fare } from 'src/app/Domain/Fare';
import { Park } from 'src/app/Domain/Park';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';
import { UserActions } from 'src/app/logic/user.actions.service';
import { AlertController, Platform } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';


@Component({
    selector: 'app-park-confirm',
    templateUrl: './park-confirm.component.html',
    styleUrls: ['./park-confirm.component.scss'],
})
export class ParkConfirmComponent implements OnInit {
    vehicles: Vehicle[];
    prueba: Park;
    fare: Fare;
    calle: string;
    constructor(private router: Router,
        private vehiclesService: VehiclesService,
        private userActions: UserActions,
        private alertController: AlertController,
        private platform: Platform,
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
        //this.userActions.registerVehicle(this.prueba.LicensePlate, this.prueba.Name,this.prueba.Description,this.prueba.OwnersEmail);
        this.vehiclesService.getEntitiesAsync().then(vehicles => this.vehiculosUsuario(vehicles));
        let lon = CurrentUserData.CurrentPosition[0];
        let lat = CurrentUserData.CurrentPosition[1];
        this.simpleReverseGeocoding(lat, lon);
    }

    vehiculosUsuario(vehicles: Vehicle[]) {
        if (CurrentUserData.LoggedUser) {
            while (vehicles.length > 0) {
                let aux = vehicles.pop();
                if (aux.OwnersEmail[0] == CurrentUserData.LoggedUser.Email) {
                    this.vehicles.push(aux);
                }
            }
        }
    }

    aparcarVehiculo(vehiculo: Vehicle) {
        this.prueba = new Park(1, vehiculo, CurrentUserData.CurrentStreet.split(',')[0], CurrentUserData.CurrentPosition, new Fare(true, '', 1, 1), new Date());
        CurrentParkingData.park = this.prueba;
        this.userActions.registerPark(this.prueba.id, this.prueba.Vehicle, this.prueba.Street, this.prueba.Coordinates, this.prueba.Fare);
        this.sendNotifications();
        this.router.navigateByUrl('main/notification');
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
        let notification: Date = new Date();
        notification.setMinutes(60 + 45); //Notificación que recibirá a cuando le queden 15 min de estacionamiento

        this.localNotification.schedule({
            id: 1,
            title: 'PRECAUCIÓN vehiculo estacionado',
            text: 'Le quedan 15 minutos para que llegue al máximo de tiempo posible para estacionar',
            trigger: { at: notification }
        });

        notification.setMinutes(10); // Notificación cuando quedan 5 minutos
        this.localNotification.schedule({
            id: 2,
            title: 'PRECAUCIÓN vehiculo estacionado',
            text: 'Le quedan 15 minutos para que llegue al máximo de tiempo posible para estacionar',
            trigger: { at: notification }
        });
    }

    showAlert(header, sub, msg) {
        this.alertController.create({
            header: header,
            subHeader: sub,
            message: msg,
            buttons: ['Ok']
        }).then(alert => alert.present());
    }

}
