import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Worker } from 'src/app/Domain/Worker';

@Injectable({
    providedIn: 'root'
})

export class WorkersService {
    private ref: firebase.database.Reference;
    private refWorkers: firebase.database.Reference;
    private workersDataBaseUrl: string = 'persons/workers';

    public listClients: any[];

    constructor() {
        this.initializeDatabase();
    }

    private initializeDatabase() {
        this.refWorkers = this.ref.child(this.workersDataBaseUrl);
    }

    public async showDatabase() {
        let snapshot = await this.refWorkers.once('value');
        return snapshot.val();
    }

    public addWorker(worker : Worker) {
        this.refWorkers.child(worker.Dni).set(worker, error => console.error(error));
    }

    public getWorker(dni: string) {
        return this.refWorkers.child(dni).once('value').then(function (snapshot) {
            var workerName = snapshot.val() && snapshot.val().Name;
            var workerSurname = snapshot.val() && snapshot.val().Surname;
            var workerUsername = snapshot.val() && snapshot.val().Username;
            var workerBirthDate = snapshot.val() && snapshot.val().BirthDate;
            var workerMail = snapshot.val() && snapshot.val().Mail;

            return new Worker(dni, workerName, workerSurname, workerUsername, workerBirthDate as Date, workerMail);
        });

    }

    public deleteWorker(dni: string) {
        this.refWorkers.child(dni).remove();
    }
}
