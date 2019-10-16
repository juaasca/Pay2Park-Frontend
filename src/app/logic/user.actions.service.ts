import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Client } from 'src/app/Domain/Client';
import { ClientsService } from '../services/dao/clients.service';
import { UsernameValidatorService } from '../services/validators/username.validator.service';
import { ExceptionMessages } from '../resources/exception.messages';
import { Router } from '@angular/router';
import { AdministratorsService } from '../services/dao/administrators.service';
import { CustomError } from '../common/custom.error';
import { ExceptionCodes } from '../resources/exception.codes';

@Injectable({
	providedIn: 'root',
})
export class UserActions {
	public user: any;
	public auth: any;
	provider: any;

	constructor(
		private clientService: ClientsService,
		private adminService: AdministratorsService,
		private usernameValidatorService: UsernameValidatorService,
		private router: Router
	) {
		this.auth = firebase.auth();
		this.auth.languageCode = 'es';
	}

	public async registerNewUserAsync(
		name: string,
		surname: string,
		username: string,
		password: string,
		birthDate: Date,
		email: string
	) {
		const client = await this.clientService.getEntity(email);

		if (client !== null) {
			throw new CustomError(
				ExceptionMessages.emailAlreadyInUse,
				ExceptionCodes.emailAlreadyInUse
			);
		} else {
			var newClient = new Client(name + ' ' + surname, username, birthDate, email);

			await firebase.auth().createUserWithEmailAndPassword(email, password);
			this.clientService.addEntity(newClient.Email, newClient);

			this.usernameValidatorService.updateList();
		}
	}

	public recoverPassword(email: string) {
		return firebase.auth().sendPasswordResetEmail(email);
	}

	// Registrarse o login con google
	public async signinUserAsync() {
		let provider = new firebase.auth.GoogleAuthProvider();

        this.auth.signInWithPopup(provider)
        .then(async (result: any) => {
                let user = await this.clientService.getEntity(result.additionalUserInfo.profile.email)
                if (result.additionalUserInfo.isNewUser || user == null) {
                    this.clientService.addEntity(result.additionalUserInfo.profile.email,
                        new Client(result.additionalUserInfo.profile.name, result.additionalUserInfo.profile.name, new Date(), result.additionalUserInfo.profile.email));
				}
				// Para añadir administrador
				//this.adminService.addEntity(result.additionalUserInfo.profile.email, new Administrator(result.additionalUserInfo.profile.name, result.additionalUserInfo.profile.name, new Date(), result.additionalUserInfo.profile.email));
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

	// Login con usuario y contraseña
	public async loginUserAsync(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(async (userCredential) => {
				if (this.clientService.getEntity(email) == null) {
					this.clientService.addEntity(email, new Client(userCredential.user.displayName, userCredential.additionalUserInfo.username, new Date(), userCredential.user.email));
				}

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
