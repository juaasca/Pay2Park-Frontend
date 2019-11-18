import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Location } from 'src/app/Domain/Location';
import { PersistenceService } from './persistence.service';

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