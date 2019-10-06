import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Administrator } from 'src/app/Domain/Administrator';
import { PersistenceService } from './persistence.service';

@Injectable({
    providedIn: 'root'
})

export class AdministratorsService extends PersistenceService<Administrator> {
    private refAdministrators: firebase.database.Reference;
    private administratorsDataBaseUrl: string = 'persons/administrators';
    
    constructor() {
        super();

        this.refAdministrators = this.ref.child(this.administratorsDataBaseUrl);
        this.databaseRef = this.refAdministrators;
    }
}
