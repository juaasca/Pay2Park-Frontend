import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { PersistenceService } from './persistence.service';

@Injectable({
    providedIn: 'root'
})

export class VehiclesService extends PersistenceService<Vehicle> {
    private refVehicles: firebase.database.Reference;
    private vehiclesDataBaseUrl = 'vehicles/cars';

    constructor() {
        super();
        this.refVehicles = this.ref.child(this.vehiclesDataBaseUrl);
        this.databaseRef = this.refVehicles;
    }
}