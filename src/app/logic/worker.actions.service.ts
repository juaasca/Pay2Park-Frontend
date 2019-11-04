import { Injectable } from '@angular/core';
import { Worker } from '../Domain/Worker';
import * as firebase from 'firebase';
import { WorkersService } from '../services/dao/workers.service';
import { CustomError } from '../common/custom.error';
import { ExceptionMessages } from '../resources/exception.messages';
import { ExceptionCodes } from '../resources/exception.codes';
import { Client } from '../Domain/Client';
import { ClientsService } from '../services/dao/clients.service';
import { Person } from '../Domain/Person';
import { UsernameValidatorService } from '../validators/username.validator.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerActionsService {
  private functions = firebase.functions();
  
  constructor(
    private clientService: ClientsService,
    private workersService: WorkersService,
    private usernameValidatorService: UsernameValidatorService) { }

  async registerNewWorkerAsync(name: string, surname: string, username: string, password: string, birthDate: Date, email: string) {
    const worker = await this.workersService.getEntityAsync(email);

		if (worker !== null) {
			throw new CustomError(
				ExceptionMessages.emailAlreadyInUse,
				ExceptionCodes.emailAlreadyInUse
			);
		} else {
			const newWorker = new Person(name + ' ' + surname, username, birthDate, email);

      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.clientService.addEntityAsync(newWorker.Email, <Client>newWorker);
          this.workersService.addEntityAsync(newWorker.Email, <Worker>newWorker);

          var sendEmailFunction = this.functions.httpsCallable('sendWelcomeEmail');

          sendEmailFunction(newWorker).then(() => this.usernameValidatorService.updateList());
        });
		}
  }

  public deleteWorkerAsync(worker: Worker) {
    var deleteUserFunction = this.functions.httpsCallable('deleteUser');

    return deleteUserFunction(worker)
        .then(async () => {
            await this.workersService.deleteEntityAsync(worker.Email);
            await this.clientService.deleteEntityAsync(worker.Email);
        }).catch((error) => console.log(error));
  }
}