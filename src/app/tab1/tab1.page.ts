import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { environment } from '../../environments/environment';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    auth: any;
    database: any;
    provider: any;

    constructor() { }

    ngOnInit() {
        // Initialize Firebase
        firebase.initializeApp(environment.firebaseConfig);
        this.database = firebase.database();
        this.auth = firebase.auth();
        this.auth.languageCode = 'es';
        this.provider = new firebase.auth.GoogleAuthProvider();

        this.auth.signInWithPopup(this.provider)
            .then((result: any) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const token = result.credential.accessToken;
                console.log(token);
                // The signed-in user info.
                const user = result.user;
                console.log(user);
            })
            .catch((error: any) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                const credential = error.credential;
            });
    }

}
