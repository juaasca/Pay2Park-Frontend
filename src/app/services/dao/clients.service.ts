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

    public listClients: any[];

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

    public addClient(user: string, password: string, dni: string, name: string, surname: string, email: string, birthDate: Date) {
        this.refClients.child(dni).set({
            user,
            password,
            name,
            surname,
            email,
            birthDate
        }, error => console.error(error));
    }

    public getClients() {
        this.refClients.on('value', snapshot => {

        }, error => console.log(error))
    }


}
