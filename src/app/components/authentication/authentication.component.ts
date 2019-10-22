import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { UserActions } from 'src/app/logic/user.actions.service';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { ExceptionCodes } from 'src/app/resources/exception.codes';
import { ExceptionMessages } from 'src/app/resources/exception.messages';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {

    public loginForm: FormGroup;

    constructor(private router: Router,
        private userActions: UserActions,
        private formBuilder: FormBuilder,
        private alertController: AlertController) {

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

    ngOnInit() {
        this.userActions.getParks();
     }

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

        this.userActions.loginUserAsync(formValue.Email, formValue.Password)
            .catch(async (error) => {
                var message = '';
                
                switch (error.code) {
                    case ExceptionCodes.invalidEmail: {
                        message = ExceptionMessages.invalidEmail;
                        break;
                    }
                    case ExceptionCodes.userDisabled: {
                        message = ExceptionMessages.userIsDisabled;
                        break;
                    }
                    case ExceptionCodes.userNotFound: {
                        message = ExceptionMessages.userNotFound;
                        break;
                    }
                    case ExceptionCodes.wrongPassword: {
                        message = ExceptionMessages.wrongPassword;
                        break;
                    }
                    default: {
                        message = ExceptionMessages.errorSigninUser;
                        break;
                    }
                }

                await this.createErrorAlertAsync(message);
            });
    }

    private async createErrorAlertAsync(message: string) {
        const alert = await this.alertController.create({
            header: '¡Error!',
            message: message,
            buttons: [
                {
                    text: 'Intentar de nuevo',
                    handler: () => {
                        alert.dismiss();
                    },
                },
            ],
        });
    
        await alert.present();
    }
}
