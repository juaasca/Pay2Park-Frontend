import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Worker } from 'src/app/Domain/Worker';
import { PersistenceService } from './persistence.service';

@Injectable({
    providedIn: 'root'
})

export class WorkersService extends PersistenceService<Worker>{
    private refWorkers: firebase.database.Reference;
    private workersDataBaseUrl: string = 'persons/workers';

    public listClients: any[];

    constructor() {
        super();
        this.refWorkers = this.ref.child(this.workersDataBaseUrl);
        this.databaseRef = this.refWorkers;
    }
}
