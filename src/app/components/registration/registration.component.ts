import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserActions } from 'src/app/logic/user.actions.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CreatePersonComponent } from '../common/create.person/create.person.component';
import { Client } from 'src/app/Domain/Client';

@Component({
    selector: 'app-registration',
    templateUrl: '../common/create.person/create.person.component.html',
    styleUrls: ['../common/create.person/create.person.component.scss', '../../globalCSS/form.scss'],
})
export class RegistrationComponent extends CreatePersonComponent<Client> implements OnInit {
    constructor(
        router: Router,
        formBuilder: FormBuilder,
        private userActions: UserActions,
        alertController: AlertController
    ) {
        super(formBuilder, alertController, router);
        this.backRoute = 'authentication';
        this.componentTitle = 'Crear cuenta';
        this.buttonTitle = 'Crear cuenta';
    }

    ngOnInit() { }

    async saveData() {
        var formValue = this.creatingPersonForm.value;

        this.userActions
            .registerNewUserAsync(formValue.Name, formValue.Surname, formValue.Username, formValue.Password, formValue.Birthdate, formValue.Email)
            .then(async () => await this.userSuccesfullyCreatedAlert())
            .catch(async error => {
                var message = this.getErrorMessageTranslated(error.code);

                await this.errorCreatingUserAlert(message);
            });
    }
}
