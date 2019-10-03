import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Vehicle } from 'src/app/Domain/Vehicle';

@Injectable({
    providedIn: 'root'
})

export class VehiclesService {
    private ref: firebase.database.Reference;
    private refVehicles: firebase.database.Reference;
    private vehiclesDataBaseUrl: string = 'vehicles/cars';

    constructor() {
        this.initializeDatabase();
    }

    private initializeDatabase() {
        this.refVehicles = this.ref.child(this.vehiclesDataBaseUrl);
    }

    public async showDatabase() {
        let snapshot = await this.refVehicles.once('value');
        return snapshot.val();
    }

    public addVehicle(vehicle: Vehicle) {
        this.refVehicles.child(vehicle.LicensePlate).set(vehicle);
    }

    public getVehicle(licensePlate: string) {
        return this.refVehicles.child(licensePlate).once('value').then(function (snapshot) {
            var vehicleName = snapshot.val() && snapshot.val().Name;
            var vehicleDescription = snapshot.val() && snapshot.val().Description;

            return new Vehicle(licensePlate, vehicleName, vehicleDescription);
        });

    }

    public deleteVehicle(licensePlate: string) {
        this.refVehicles.child(licensePlate).remove();
    }
}