import { Injectable } from '@angular/core';
import { ParkService } from '../services/dao/parks.service';

@Injectable({
  providedIn: 'root'
})
export class ParkActionsServiceService {
  constructor(private parkService: ParkService) { }

  getParksByLicensePlateAsync(licensePlate: string) {
    return this.parkService.getEntitiesAsync()
      .then((parks) => {
        return parks.filter(park => park.Vehicle.LicensePlate === licensePlate);
      })
  }
}
