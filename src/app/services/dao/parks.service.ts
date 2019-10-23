import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { PersistenceService } from './persistence.service';
import { Park } from 'src/app/Domain/Park';

@Injectable({
    providedIn: 'root'
})

export class ParkService extends PersistenceService<Park> {
    private refPark: firebase.database.Reference;
    private vehiclesDataBaseUrl = 'parks';

    constructor() {
        super();
        this.refPark = this.ref.child(this.vehiclesDataBaseUrl);
        this.databaseRef = this.refPark;
    }
}