import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClientsService } from '../services/dao/clients.service';
import { Client } from '../Domain/Client';

@Injectable({
    providedIn: 'root'
})
export class UsernameValidatorService {
    static ExistingUsers: Client[] = [];

    constructor(private clientService: ClientsService) {        
        setInterval(() => {
            this.updateList();
        }, 1000);
    }

    updateList() {
        this.clientService.getEntitiesAsync().then((users) => UsernameValidatorService.ExistingUsers = users);
    }

    static validUsername(fc: FormControl) {
        var userExists = UsernameValidatorService.ExistingUsers.some(user => {
            return fc.value.toLowerCase() === user.Username.toLowerCase();
        });

        if (!userExists) {
            return (null);
        } else {
            return ({ validUsername: true });
        }
    }
}