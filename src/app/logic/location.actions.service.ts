import { Injectable } from '@angular/core';
import { LocationService } from '../services/dao/location.service';
import { Location } from '../Domain/Location';

@Injectable({
    providedIn: 'root'
})

export class LocationActionsService {
    constructor(private locationService: LocationService) { }

    registerNewLocationAsync(location: Location) {
        return this.locationService.addEntityAsync(location.Name, location);
    }

    deleteLocationAsync(location: Location){
        return this.locationService.deleteEntityAsync(location.Name);
    }

    getLocationsAsync() {
        return this.locationService.getEntitiesAsync();
    }
}