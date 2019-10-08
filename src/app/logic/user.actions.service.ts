import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Client } from 'src/app/Domain/Client';
import { ClientsService } from '../services/dao/clients.service';

@Injectable({
  providedIn: 'root'
})

export class UserActions {
    constructor(private clientsService: ClientsService) {
    }
    
    public registerNewUser(dni: string, name: string, surname: string, username: string, password: string, birthDate: Date, email: string) {
      this.clientsService.getEntity(username).then((client) => {
        if (client !== null) {
          throw new Error('User already in use');
        } else {
          var newClient =
            new Client(dni, name, surname, username, birthDate, email);
  
          firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            this.clientsService.addEntity(newClient.Username, newClient);
          }).catch(function(error) {
            var errorMessage = error.message;
          
            throw new Error(errorMessage);
          });
        }
      });
    }
}
