import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Client } from 'src/app/Domain/Client';
import { ClientsService } from '../services/dao/clients.service';
import { UsernameValidatorService } from '../services/validators/username.validator.service';
import { ExceptionMessages } from '../resources/exception-messages';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class UserActions {

    public user: any;

    constructor(private clientsService: ClientsService, private usernameValidatorService: UsernameValidatorService, private router: Router) { }

    public async registerNewUserAsync(name: string, surname: string, username: string, password: string, birthDate: Date, email: string) {
        try {
            const client = await this.clientsService.getEntity(username);

            if (client !== null) {
                throw new Error(ExceptionMessages.userAlreadyInUse);
            }
            else {
                var newClient = new Client(name, surname, username, birthDate, email);

                await firebase.auth().createUserWithEmailAndPassword(email, password);
                this.clientsService.addEntity(newClient.Email, newClient);

                this.usernameValidatorService.updateList();
            }
        } catch (error) {
            var message = '';

            switch (error.code) {
                case 'auth/email-already-in-use': {
                    message = ExceptionMessages.emailAlreadyInUse;

                    break;
                }
                case 'auth/invalid-email': {
                    message = ExceptionMessages.invalidEmail;

                    break;
                }
                default: {
                    message = ExceptionMessages.errorCreatingUser;

                    break;
                }
            }

            throw new Error(message);
        }
    }

    public async recoverPassword(email: string) {
        try {
            firebase.auth().sendPasswordResetEmail(email)
        } catch (error) {
            throw new Error(ExceptionMessages.invalidEmail);
        }

    }

    public async loginUserAsync(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                this.user = userCredential;
                console.log(this.user);
                this.router.navigateByUrl('tabs/park');
            })
            .catch(error => {
                var message = '';
                console.log(error.message);
                switch (error.code) {
                    case 'auth/wrong-password': {
                        message = ExceptionMessages.invalidPassword;
                        break;
                    }
                    case 'auth/invalid-email': {
                        message = ExceptionMessages.invalidEmail;
                        break;
                    }
                    default: {
                        message = ExceptionMessages.errorSigninUser;
                        break;
                    }
                }

                throw new Error(message);
            });
    }
}
