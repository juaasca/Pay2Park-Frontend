import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Fare } from 'src/app/Domain/Fare';
import { PersistenceService } from './persistence.service';

@Injectable({
    providedIn: 'root'
})

export class TariffService extends PersistenceService<Fare> {

    private refTariffs: firebase.database.Reference;
    private tariffsDataBaseUrl: string = 'fare';

    constructor() {
        super();
        this.refTariffs = this.ref.child(this.tariffsDataBaseUrl);
        this.databaseRef = this.refTariffs;
    }
}
