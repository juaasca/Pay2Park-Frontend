import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Client } from 'src/app/Domain/Client';

@Injectable({
    providedIn: 'root'
})

export class ClientsService {
    private ref: firebase.database.Reference;
    private refClients: firebase.database.Reference;
    private clientsDataBaseUrl: string = 'persons/clients';

    public listClients: any[];

    constructor() {
        this.initializeDatabase();
    }

    private initializeDatabase() {
        this.ref = firebase.app().database().ref();
        
        this.refClients = this.ref.child(this.clientsDataBaseUrl);
    }

    public async showDatabase() {
        let snapshot = await this.refClients.once('value');
        return snapshot.val();
    }

    public addClient(client : Client) {
        this.refClients.child(client.Dni).set(client, error => console.error(error));
    }

    public getClient(dni: string) {
        return this.refClients.child(dni).once('value').then(function (snapshot) {
            var clientName = snapshot.val() && snapshot.val().Name;
            var clientSurname = snapshot.val() && snapshot.val().Surname;
            var clientUsername = snapshot.val() && snapshot.val().Username;
            var clientBirthDate = snapshot.val() && snapshot.val().BirthDate;
            var clientMail = snapshot.val() && snapshot.val().Mail;

            return new Client(dni, clientName, clientSurname, clientUsername, clientBirthDate as Date, clientMail);
        });

    }

    public deleteClient(dni: string) {
        this.refClients.child(dni).remove();
    }

    public getClients() {
        this.refClients.on('value', snapshot => {

        }, error => console.log(error))
    }


}
