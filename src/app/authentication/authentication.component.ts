import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { environment } from '../../environments/environment';
import { ClientsService } from '../services/dao/clients.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {

    auth: any;
    provider: any;

    constructor(private router: Router, private clientService: ClientsService) { }

    ngOnInit() { }

    logWithGoogle() {
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
                console.log(this.clientService.addClient('jasensic123', '123', '123', 'jc', 'asensi', 'jc', new Date()));
                this.router.navigateByUrl('tabs/park');
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
    register(){
        this.router.navigateByUrl('registration')
    }
forgot(){
    this.router.navigateByUrl('forgot')
}
logIn(){
    
}
}
