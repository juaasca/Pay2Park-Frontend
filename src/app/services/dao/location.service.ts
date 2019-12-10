import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { PersistenceService } from './persistence.service';
import { Location } from '../../Domain/Location';

@Injectable({
    providedIn: 'root'
})

export class LocationService extends PersistenceService<Location> {
    public refLocation: firebase.database.Reference;
    private locationsDataBaseUrl: string = 'locations';

    constructor() {
        super();
        this.refLocation = this.ref.child(this.locationsDataBaseUrl+"");
        this.databaseRef = this.refLocation;
    }
}