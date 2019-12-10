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
import { Tariff } from '../Domain/Tariff';
import { Park } from '../Domain/Park';
import { ParkService } from '../services/dao/parks.service';
import { CurrentParkingData } from '../data/currentParking';
import { WorkersService } from '../services/dao/workers.service';
import { Person } from '../Domain/Person';
import { Transactions } from '../Domain/Transactions';
import { HistoryService } from '../services/dao/history.service';

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
        private historiesService: HistoryService,
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
        const client = await this.clientService.getEntityAsync(email);

        if (client !== null) {
            throw new CustomError(
                ExceptionMessages.emailAlreadyInUse,
                ExceptionCodes.emailAlreadyInUse
            );
        } else {
            //const wallet: Wallet = new Wallet(0);
            const newClient: Client = new Client(name + ' ' + surname, username, birthDate, email, 0, 0, false, 0);

            await firebase.auth().createUserWithEmailAndPassword(email, password);
            this.clientService.addEntityAsync(newClient.Email, newClient);
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

    public addHistory(user: Client, transaction: Transactions) {
        this.historiesService.addEntityAsync(transaction.Date, transaction);
        //this.clientService.refClients.child(user.Email.replace('.', '&&').toLowerCase()+'/History/'+ transaction.Date).set(transaction);
    }

    public updateWallet(user: Client) {
        this.clientService.refClients.child(user.Email.replace('.', '&&').toLowerCase()).set(user);
    }

    public updateBono(user: Client) {
        this.clientService.refClients.child(user.Email.replace('.', '&&').toLowerCase()).set(user);
    }

    // Registrarse o login con google
    public async signinUserAsync() {
        const provider = new firebase.auth.GoogleAuthProvider();

        this.auth.signInWithPopup(provider)
            .then(async (result: any) => {
                let email = result.additionalUserInfo.profile.email;
                let name = result.additionalUserInfo.profile.name;

                let user = await this.clientService.getEntityAsync(email);
                if (result.additionalUserInfo.isNewUser || user == null) {
                    user = new Client(name, name, new Date(), email, 0, 0, false, 0);
                    this.clientService.addEntityAsync(email, user);

                }
                // Para añadir administrador
                // this.adminService.addEntity(result.additionalUserInfo.profile.email, new Administrator(result.additionalUserInfo.profile.name, result.additionalUserInfo.profile.name, new Date(), result.additionalUserInfo.profile.email));
                CurrentUserData.LoggedUser = new Client(result.additionalUserInfo.profile.name,
                    result.additionalUserInfo.profile.name, new Date(), result.additionalUserInfo.profile.email, result.additionalUserInfo.profile.wallet, result.additionalUserInfo.profile.FechaFinalizacion, result.additionalUserInfo.profile.EsMultiBono, result.additionalUserInfo.profile.CochesAparcados);

                let auxUser = await this.clientService.getEntityAsync(result.additionalUserInfo.profile.email);
                CurrentUserData.wallet = auxUser.Wallet;
                CurrentUserData.FechaFinalizacion = auxUser.FechaFinalizacion;
                CurrentUserData.CochesAparcados = auxUser.CochesAparcados;
                CurrentUserData.EsMultiBono = auxUser.EsMultiBono.valueOf(); 

                await this.checkAdmin(email);
                await this.checkWorker(email);

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
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                let currentClient = await this.clientService.getEntityAsync(email);

                if (currentClient == null) {
                    currentClient = new Client(userCredential.user.displayName, userCredential.additionalUserInfo.username, new Date(), userCredential.user.email, 0, 0, false, 0);

                    await this.clientService.addEntityAsync(email, currentClient);
                }

                CurrentUserData.LoggedUser = currentClient;
                CurrentUserData.wallet = currentClient.Wallet;
                CurrentUserData.FechaFinalizacion = currentClient.FechaFinalizacion;
                CurrentUserData.CochesAparcados = currentClient.CochesAparcados;
                CurrentUserData.EsMultiBono = currentClient.EsMultiBono.valueOf(); 


                await this.checkAdmin(email);
                await this.checkWorker(email);

                this.router.navigateByUrl('main/park');
            });
    }

    public async registerVehicle(licensePlate: string, name: string, description: string, owner: string) {
        const vehicle = await this.clientService.getEntityAsync(licensePlate);

        if (vehicle !== null) {
            throw new CustomError(
                ExceptionMessages.emailAlreadyInUse,
                ExceptionCodes.emailAlreadyInUse
            );
        } else {
            const newCar = new Vehicle(licensePlate, name, description, owner);

            this.vehicleService.addEntityAsync(newCar.LicensePlate, newCar);

            //this.usernameValidatorService.updateList();
        }
    }

    public async registerPark(id: number, vehicle: Vehicle, street: string, coordinates: [number, number], fare: Tariff) {

        let newPark = new Park(id, vehicle, street, coordinates, fare, new Date().toString());
        this.parkService.addEntityAsync(newPark.id.toString(), newPark);
        //this.usernameValidatorService.updateList();

    }

    public async newId(id:number){
        let park = await this.parkService.getEntityAsync(id.toString());
        while (park) {
            id++;
            park = await this.parkService.getEntityAsync(id.toString());
        }
        return id;
    }
    
    getParks() {
        this.parkService.getEntitiesAsync().then(parks => CurrentParkingData.parks = parks);
    }

    private checkAdmin(email: string) {
        return this.adminService.getEntityAsync(email)
            .then((admin) => {
                if (admin != null) {
                    CurrentUserData.IsAdmin = true;
                    CurrentUserData.IsChecker = false;
                }
            })
            .catch(error => {
                console.error(error);
                throw new Error(error.message);
            })
    }

    private checkWorker(email: string) {
        return this.workerService.getEntityAsync(email)
            .then((worker) => {
                if (worker != null) {
                    CurrentUserData.IsAdmin = false;
                    CurrentUserData.IsChecker = true;
                };
            })
            .catch(error => {
                console.error(error);
                throw new Error(error.message);
            })
    }
}