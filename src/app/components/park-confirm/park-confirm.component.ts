import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { CurrentUserData } from 'src/app/data/current.user';
import { Tariff } from 'src/app/Domain/Tariff';
import { Park } from 'src/app/Domain/Park';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';
import { UserActions } from 'src/app/logic/user.actions.service';
import { AlertController, Platform } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { CurrentParkingData } from 'src/app/data/currentParking';


@Component({
    selector: 'app-park-confirm',
    templateUrl: './park-confirm.component.html',
    styleUrls: ['./park-confirm.component.scss'],
})
export class ParkConfirmComponent implements OnInit {
    vehicles: Vehicle[];
    prueba: Park;
    fare: Tariff;
    calle: string;
    color: string;
    tariffs: Tariff[];

    
    constructor(private router: Router, private vehiclesService: VehiclesService, private userActions: UserActions) {
        //this.prueba = new Vehicle('123','este','esta',['rmartinezdaniel@gmail.com']);
        this.vehicles = [];
    }

    ngOnInit() {
        //this.userActions.registerVehicle(this.prueba.LicensePlate, this.prueba.Name,this.prueba.Description,this.prueba.OwnersEmail);
        this.vehiclesService.getEntitiesAsync().then(vehicles => this.vehiculosUsuario(vehicles));
        let lon = CurrentUserData.CurrentPosition[0];
        let lat = CurrentUserData.CurrentPosition[1];
        this.simpleReverseGeocoding(lat, lon);
        this.color = CurrentUserData.color;
        setInterval(() => {
            this.color = CurrentUserData.color;
        }, 1000);
        this.fare = new Tariff(true,'Tiempo Real',0.1,0);
        this.tariffs = [this.fare] ;
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
        this.prueba = new Park(1, vehiculo, CurrentUserData.CurrentStreet.split(',')[0], CurrentUserData.CurrentPosition, new Tariff(true, '', 1, 1), new Date().toString());
        CurrentParkingData.park = this.prueba;
        this.userActions.registerPark(this.prueba.id, this.prueba.Vehicle, this.prueba.Street, this.prueba.Coordinates, this.prueba.Fare);
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
}
