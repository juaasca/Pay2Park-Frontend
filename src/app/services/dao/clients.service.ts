import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Client } from 'src/app/Domain/Client';
import { PersistenceService } from './persistence.service';

@Injectable({
    providedIn: 'root'
})

export class ClientsService extends PersistenceService<Client> {

    private refClients: firebase.database.Reference;
    private clientsDataBaseUrl: string = 'persons/clients';

    constructor() {
        super();
        this.refClients = this.ref.child(this.clientsDataBaseUrl);
        this.databaseRef = this.refClients;
    }
}
