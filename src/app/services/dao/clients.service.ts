import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ClientsService {

    public app: firebase.app.App;
    private database: firebase.database.Database;
    private ref: firebase.database.Reference;
    private refClients: firebase.database.Reference;


    constructor() {
        this.initializeDatabase();
    }

    private initializeDatabase() {
        this.app = firebase.initializeApp(environment.firebaseConfig);
        this.database = firebase.database();

        this.ref = firebase.app().database().ref();
        this.refClients = this.ref.child('users/clients');
    }

    public async showDatabase() {
        let snapshot = await this.refClients.once('value');
        return snapshot.val();
    }

    public addClient(name: string, surname: string) {
        return this.refClients.push({
            name,
            surname
        });
    }
}
