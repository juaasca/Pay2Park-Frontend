import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Administrator } from 'src/app/Domain/Administrator';

@Injectable({
    providedIn: 'root'
})

export class AdministratorsService {
    private ref: firebase.database.Reference;
    private refAdministrators: firebase.database.Reference;
    private administratorsDataBaseUrl: string = 'persons/administrators';

    public listClients: any[];

    constructor() {
        this.initializeDatabase();
    }

    private initializeDatabase() {
        this.refAdministrators = this.ref.child(this.administratorsDataBaseUrl);
    }

    public async showDatabase() {
        let snapshot = await this.refAdministrators.once('value');
        return snapshot.val();
    }

    public addAdministrator(administrator : Administrator) {
        this.refAdministrators.child(administrator.Dni).set(administrator, error => console.error(error));
    }

    public getAdministrator(dni: string) {
        return this.refAdministrators.child(dni).once('value').then(function (snapshot) {
            var administratorName = snapshot.val() && snapshot.val().Name;
            var administratorSurname = snapshot.val() && snapshot.val().Surname;
            var administratorUsername = snapshot.val() && snapshot.val().Username;
            var administratorBirthDate = snapshot.val() && snapshot.val().BirthDate;
            var administratorMail = snapshot.val() && snapshot.val().Mail;

            return new Administrator(dni, administratorName, administratorSurname, administratorUsername, administratorBirthDate as Date, administratorMail);
        });

    }

    public deleteAdministrator(dni: string) {
        this.refAdministrators.child(dni).remove();
    }
}
