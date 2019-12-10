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

    updateExistingLocation(originalLocation: Location, updatedLocation: Location) {
        return this.locationService.deleteEntityAsync(originalLocation.Name)
            .then(() => { return this.locationService.addEntityAsync(updatedLocation.Name, updatedLocation)});
    }

    deleteLocationAsync(location: Location){
        return this.locationService.deleteEntityAsync(location.Name);
    }

    getLocationsAsync() {
        return this.locationService.getEntitiesAsync();
    }

    getLocationByNameAsync(locationName: string) {
        return this.locationService.getEntityAsync(locationName);
    }
}