import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { UserActions } from 'src/app/logic/user.actions.service';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(private router: Router,
        private userActions: UserActions,
        private formBuilder: FormBuilder) {

        this.loginForm = this.formBuilder.group({
            Email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            Password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
            ]))
        });
    }

    ngOnInit() { }

    logWithGoogle() {
        this.userActions.signinUserAsync();
    }

    register() {
        this.router.navigateByUrl('registration')
    }

    forgot() {
        this.router.navigateByUrl('forgot')
    }

    logIn() {
        let formValue = this.loginForm.value;

        this.userActions.loginUserAsync(formValue.Email, formValue.Password);
    }
}
