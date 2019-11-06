import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CreatePersonComponent } from 'src/app/components/common/create.person/create.person.component';
import { Worker } from 'src/app/Domain/Worker';
import { WorkerActionsService } from 'src/app/logic/worker.actions.service';

@Component({
    selector: 'app-create.person',
    templateUrl: '../../../common/create.person/create.person.component.html',
    styleUrls: ['../../../common/create.person/create.person.component.scss'],
})
export class CreateCheckerComponent extends CreatePersonComponent<Worker> implements OnInit {
  constructor(
    router: Router,
    formBuilder: FormBuilder,
    alertController: AlertController,
    private workerActions: WorkerActionsService
    ) {
      super(formBuilder, alertController, router);
      this.backRoute = 'main/admin/manage-checkers';
    }
    
    ngOnInit() {
    }
    
    async saveData() {
      var formValue = this.creatingPersonForm.value;

        this.workerActions
            .registerNewWorkerAsync(formValue.Name, formValue.Surname, formValue.Username, formValue.Password, formValue.Birthdate, formValue.Email)
            .then(async () => await this.userSuccesfullyCreatedAlert())
            .catch(async error => {
                var message = this.getErrorMessageTranslated(error.code);

                await this.errorCreatingUserAlert(message);
            });
    }
}