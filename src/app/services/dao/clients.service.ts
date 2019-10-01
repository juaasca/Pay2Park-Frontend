import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ClientsService {

    public app: firebase.app.App
    private database: firebase;

    constructor() {
        // Initialize Firebase
        firebase.initializeApp(environment.firebaseConfig);
        this.database = firebase.database();

        let ref = firebase.app().database().ref();
        ref.once('value')
            .then(snap => {
                //Show database values  
                //console.log(snap.val());
            });
        let usersRef = ref.child('users');
        // Create a new ref and save data to it in one step
        let userRef = usersRef.push({
            name: 'Christopher',
            description: 'I eat too much ice cream'
        });
        console.log(userRef.parent);
    }
}
