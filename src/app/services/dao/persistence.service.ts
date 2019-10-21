import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})

export abstract class PersistenceService<T> {

    protected ref: firebase.database.Reference;
    protected database: firebase.database.Database;
    protected databaseRef: firebase.database.Reference;
    protected path: string;

    constructor() {
        this.initializeDatabase();
    }

    private initializeDatabase() {
        this.database = firebase.app().database();
        this.ref = this.database.ref();
    }

    public async showDatabase() {
        let snapshot = await this.databaseRef.once('value');

        return snapshot.val();
    }

    public addEntity(key: string, administrator: T) {
        this.databaseRef.child(key.replace('.', '&&')).set(administrator, error => console.error(error));
    }

    public getEntity(key: string) {
        return this.database.ref(this.path + key.replace('.', '&&')).once('value').then((snapshot) => {
            var entity = <T>snapshot.val();
            return entity;
        });
    }

    public deleteEntity(key: string) {
        this.databaseRef.child(key.replace('.', '&&')).remove();
    }

    public async getEntitiesAsync() {
        const clients: T[] = [];

        await this.databaseRef.once('value').then(async function (snapshot) {
            snapshot.forEach(childSnapshot => {
                var client = <T>childSnapshot.val();

                clients.push(client);
            })
        });

        return clients;
    }
}