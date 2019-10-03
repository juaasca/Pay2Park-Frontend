import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InitializeService {

    public app: firebase.app.App;

    constructor() { }

    initialize() {
        this.app = firebase.initializeApp(environment.firebaseConfig);
    }
}
