import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Client } from 'src/app/Domain/Client';
import { ClientsService } from '../services/dao/clients.service';
import { UsernameValidatorService } from '../services/validators/username.validator.service';
import { ExceptionMessages } from '../resources/exception-messages';

@Injectable({
  providedIn: 'root'
})

export class UserActions {
  constructor(private clientsService: ClientsService, private usernameValidatorService: UsernameValidatorService) {
  }
    
  public async registerNewUserAsync(name: string, surname: string, username: string, password: string, birthDate: Date, email: string) {
      try {
        const client = await this.clientsService.getEntity(username);
        
        if (client !== null) {
          throw new Error(ExceptionMessages.userAlreadyInUse);
        }
        else {
          var newClient = new Client(name, surname, username, birthDate, email);
        
          await firebase.auth().createUserWithEmailAndPassword(email, password);
          this.clientsService.addEntity(newClient.Username, newClient);

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
}
