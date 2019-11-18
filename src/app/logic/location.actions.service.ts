import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
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

    deleteTariffAsync(location: Location){
        return this.locationService.deleteEntityAsync(location.Name);
    } 
}