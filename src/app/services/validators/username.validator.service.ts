import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClientsService } from '../dao/clients.service';
import { Client } from 'src/app/Domain/Client';

@Injectable({
  providedIn: 'root'
})

export class UsernameValidatorService {
  static ExistingUsers: Client[] = [];

  constructor(private clientService: ClientsService) {
    this.clientService.getEntitiesAsync().then((users) => UsernameValidatorService.ExistingUsers = users);
  }

  updateList() {
    this.clientService.getEntitiesAsync().then((users) => UsernameValidatorService.ExistingUsers = users);
  }

  static validUsername (fc: FormControl){
    var userExists = UsernameValidatorService.ExistingUsers.some(user => {
      return fc.value.toLowerCase() === user.Username.toLowerCase();
    });
    
    if (!userExists) {
      return (null);
    } else {
      return ({validUsername: true});
    }
  }
}