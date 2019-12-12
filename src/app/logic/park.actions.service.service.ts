import { Injectable } from '@angular/core';
import { ParkService } from '../services/dao/parks.service';

@Injectable({
  providedIn: 'root'
})
export class ParkActionsServiceService {
  constructor(private parkService: ParkService) { }

  getParkByLicensePlateAsync(licensePlate: string) {
    return this.parkService.getEntitiesAsync()
      .then((parks) => {
        return parks.find(park => park.VehiclePlate.toLowerCase() === licensePlate.toLowerCase());
      })
  }
}
