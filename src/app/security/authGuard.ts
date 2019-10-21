import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { CurrentUserData } from '../data/current.user';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        
        if (CurrentUserData.LoggedUser == null) {
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }
}