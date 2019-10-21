// tslint:disable: indent
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
import { CurrentUserData } from '../data/current.user';
import { Vehicle } from '../Domain/Vehicle';
import { VehiclesService } from '../services/dao/vehicles.service';
import { Fare } from '../Domain/Fare';
import { Park } from '../Domain/Park';
import { ParkService } from '../services/dao/parks.service';
import { CurrentParkingData } from '../data/currentParking';

@Injectable({
	providedIn: 'root',
})
export class UserActions {
	public user: any;
	public auth: any;
	provider: any;
	
	private functions = firebase.functions();

	constructor(
		private clientService: ClientsService,
		private vehicleService: VehiclesService,
		private parkService: ParkService,
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
			const newClient = new Client(name + ' ' + surname, username, birthDate, email);

			await firebase.auth().createUserWithEmailAndPassword(email, password);
			this.clientService.addEntity(newClient.Email, newClient);

			this.usernameValidatorService.updateList();
		}
	}

	public deleteClient(client: Client) {
		var deleteUserFunction = this.functions.httpsCallable('deleteUser');
		deleteUserFunction(client)
			.then(() => {
				this.clientService.deleteEntity(client.Email);
			}).catch((error) => console.log(error));
	}

	public recoverPassword(email: string) {
		return firebase.auth().sendPasswordResetEmail(email);
	}

	// Registrarse o login con google
	public async signinUserAsync() {
		const provider = new firebase.auth.GoogleAuthProvider();

  		this.auth.signInWithPopup(provider)
        .then(async (result: any) => {
                const user = await this.clientService.getEntity(result.additionalUserInfo.profile.email);
                if (result.additionalUserInfo.isNewUser || user == null) {
                    this.clientService.addEntity(result.additionalUserInfo.profile.email,
						new Client(result.additionalUserInfo.profile.name,
							result.additionalUserInfo.profile.name, new Date(), result.additionalUserInfo.profile.email));

				}
				// Para añadir administrador
				// this.adminService.addEntity(result.additionalUserInfo.profile.email, new Administrator(result.additionalUserInfo.profile.name, result.additionalUserInfo.profile.name, new Date(), result.additionalUserInfo.profile.email));
							CurrentUserData.LoggedUser= new Client(result.additionalUserInfo.profile.name,
								result.additionalUserInfo.profile.name, new Date(), result.additionalUserInfo.profile.email);
				            this.router.navigateByUrl('main/park');
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
					this.clientService.addEntity(email,
						 new Client(userCredential.user.displayName, userCredential.additionalUserInfo.username, new Date(), userCredential.user.email));
				}
				const client: Client = new Client(userCredential.user.displayName,
					userCredential.additionalUserInfo.username, new Date(), userCredential.user.email);

				CurrentUserData.LoggedUser = client;

				this.router.navigateByUrl('main/park');
			})
			.catch(error => {
				let message = '';
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

	public async registerVehicle(licensePlate: string, name: string, description: string, owner: string[]) {
		const vehicle = await this.clientService.getEntity(licensePlate);

		if (vehicle !== null) {
			throw new CustomError(
				ExceptionMessages.emailAlreadyInUse,
				ExceptionCodes.emailAlreadyInUse
			);
		} else {
			const newCar = new Vehicle(licensePlate,name,description,owner);

			this.vehicleService.addEntity(newCar.LicensePlate, newCar);

			//this.usernameValidatorService.updateList();
		}
	}

	public async registerPark(id: number, vehicle: Vehicle, street: string, coordinates: [number, number], fare: Fare) {
		const park = await this.clientService.getEntity(id.toString());

		if (park !== null) {
			throw new CustomError(
				ExceptionMessages.emailAlreadyInUse,
				ExceptionCodes.emailAlreadyInUse
			);
		} else {
			const newPark = new Park(id,vehicle,street,coordinates,fare, new Date());
			this.parkService.addEntity(newPark.id.toString(), newPark);
			//this.usernameValidatorService.updateList();
		}
	}

	getParks(){
		this.parkService.getEntitiesAsync().then(parks => CurrentParkingData.parks= parks);
	 }
}
