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
    
  public async registerNewUserAsync(dni: string, name: string, surname: string, username: string, password: string, birthDate: Date, email: string) {
      try {
        const client = await this.clientsService.getEntity(username);
        
        if (client !== null) {
          throw new Error('User already in use.');
        }
        else {
          var newClient = new Client(dni, name, surname, username, birthDate, email);
        
          await firebase.auth().createUserWithEmailAndPassword(email, password);
          this.clientsService.addEntity(newClient.Username, newClient);
        }
      } catch (error) {
        throw new Error(error);
      }
  }
}
