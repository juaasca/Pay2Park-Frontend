import { Injectable } from '@angular/core';
import { VehiclesService } from '../services/dao/vehicles.service';
import { Vehicle } from '../Domain/Vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleActionsService {

  constructor(private vehiclesService: VehiclesService) { }

  getVehiclesByOwner(ownerEmail: string) {    
    return this.vehiclesService.getEntitiesAsync()
      .then((vehicles) => {
        return vehicles.filter((vehicle) => vehicle.OwnerEmail === ownerEmail);
      });
  }
}
