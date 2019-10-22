import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { PersistenceService } from './persistence.service';
import { Client } from 'src/app/Domain/Client';

@Injectable({
    providedIn: 'root'
})

export class VehiclesService extends PersistenceService<Vehicle> {
    private refVehicles: firebase.database.Reference;
    private vehiclesDataBaseUrl = 'vehicles/cars';

    constructor() {
        super();
        this.path = this.vehiclesDataBaseUrl;
        this.refVehicles = this.ref.child(this.vehiclesDataBaseUrl);
        this.databaseRef = this.refVehicles;
    }

    getRelatedVehiclesAsync(client: Client) {
        var relatedVehicles: Vehicle[] = [];
        
        return this.getEntitiesAsync()
          .then((vehicles) => {
            vehicles.forEach(vehicle => {
              if (vehicle.OwnersEmail.some(email => client.Email === email)) {
                relatedVehicles.push(vehicle);
              }
            });
    
            return relatedVehicles;
          });
      }
}