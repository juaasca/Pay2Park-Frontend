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
import { WorkersService } from '../services/dao/workers.service';

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
        private workerService: WorkersService,
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
            const newClient: Client = new Client(name + ' ' + surname, username, birthDate, email);

            await firebase.auth().createUserWithEmailAndPassword(email, password);
            this.clientService.addEntity(newClient.Email, newClient);
            this.user = newClient;

            this.usernameValidatorService.updateList();
        }
    }

    public deleteClientAsync(client: Client) {
        var deleteUserFunction = this.functions.httpsCallable('deleteUser');

        return deleteUserFunction(client)
            .then(async () => {
                await this.clientService.deleteEntityAsync(client.Email);
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
                let email = result.additionalUserInfo.profile.email;
                let name = result.additionalUserInfo.profile.name;

                const user = await this.clientService.getEntity(email);
                if (result.additionalUserInfo.isNewUser || user == null) {
                    this.clientService.addEntity(result.additionalUserInfo.profile.email,
                        new Client(name, name, new Date(), email));

                }
                // Para añadir administrador
                // this.adminService.addEntity(result.additionalUserInfo.profile.email, new Administrator(result.additionalUserInfo.profile.name, result.additionalUserInfo.profile.name, new Date(), result.additionalUserInfo.profile.email));
                CurrentUserData.LoggedUser = new Client(result.additionalUserInfo.profile.name,
                    result.additionalUserInfo.profile.name, new Date(), result.additionalUserInfo.profile.email);

                this.checkAdmin(email);
                this.checkWorker(email);
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
                this.checkAdmin(email);
                this.checkWorker(email);
                this.router.navigateByUrl('main/park');
            })
            .catch(error => {
                let message = '';
                console.error(error.message);
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
            const newCar = new Vehicle(licensePlate, name, description, owner);

            this.vehicleService.addEntity(newCar.LicensePlate, newCar);

            //this.usernameValidatorService.updateList();
        }
    }

    public async registerPark(id: number, vehicle: Vehicle, street: string, coordinates: [number, number], fare: Fare) {
        let park = await this.parkService.getEntity(id.toString());
        while (park) {
            id++;
            park = await this.parkService.getEntity(id.toString());
        }
        console.log(id);

        let newPark = new Park(id, vehicle, street, coordinates, fare, new Date());
        this.parkService.addEntity(newPark.id.toString(), newPark);
        //this.usernameValidatorService.updateList();

    }

    getParks() {
        this.parkService.getEntitiesAsync().then(parks => CurrentParkingData.parks = parks);
    }

    private checkAdmin(email: string) {
        this.adminService.getEntity(email)
            .then((admin) => {
                if (admin != null) {
                    CurrentUserData.IsAdmin = true;
                    CurrentUserData.IsChecker = true;
                }
            })
            .catch(error => {
                console.error(error);
                throw new Error(error.message);
            })
    }

    private checkWorker(email: string) {
        this.workerService.getEntity(email)
            .then((worker) => {
                if (worker != null) {
                    CurrentUserData.IsAdmin = false;
                    CurrentUserData.IsChecker = true;
                }
            })
            .catch(error => {
                console.error(error);
                throw new Error(error.message);
            })
    }
}
