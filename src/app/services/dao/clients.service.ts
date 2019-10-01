import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ClientsService {

    public app: firebase.app.App;
    private database: firebase.database.Database;
    private ref: firebase.database.Reference;
    private refClient: firebase.database.Reference;


    constructor() {
        // Create a new ref and save data to it in one step

        console.log(userRef.parent);
    }

    private initializeDatabase() {
        this.app = firebase.initializeApp(environment.firebaseConfig);
        this.database = firebase.database();

        this.ref = firebase.app().database().ref();
        this.refClient = this.ref.child('users/clients');
    }

    public showDatabase() {
        this.ref.once('value')
            .then(snap => {
                // Show database values
                return snap.val();
            });
    }

    public addClient(name: string, surname: string) {
        return this.refClient.push({
            name,
            surname
        });
    }
}
