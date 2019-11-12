import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { PersistenceService } from './persistence.service';
import { Tariff } from 'src/app/Domain/Tariff';

@Injectable({
    providedIn: 'root'
})

export class TariffService extends PersistenceService<Tariff> {

    private refTariffs: firebase.database.Reference;
    private tariffsDataBaseUrl: string = 'tariff';

    constructor() {
        super();
        this.refTariffs = this.ref.child(this.tariffsDataBaseUrl);
        this.databaseRef = this.refTariffs;
    }
}
