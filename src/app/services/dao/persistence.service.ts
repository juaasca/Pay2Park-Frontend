import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})

export abstract class PersistenceService<T> {

    protected ref: firebase.database.Reference;
    protected database: firebase.database.Database;
    protected databaseRef: firebase.database.Reference;

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

    public addEntityAsync(key: string, entity: T) {
        return this.databaseRef.child(key.replace('.', '&&').toLowerCase()).set(entity);
    }

    public getEntityAsync(key: string) {
        return this.databaseRef.child(key.replace('.', '&&').toLowerCase()).once('value').then((snapshot) => {
            var entity = <T>snapshot.val();
            return entity;
        });
    }

    public deleteEntityAsync(key: string) {
        return this.databaseRef.child(key.replace('.', '&&').toLowerCase()).remove();
    }

    public getEntitiesAsync() {
        const clients: T[] = [];

        return this.databaseRef.once('value').then((snapshot) => {
            snapshot.forEach(childSnapshot => {
                var client = <T>childSnapshot.val();

                clients.push(client);
            });

            return clients;
        });
    }
}