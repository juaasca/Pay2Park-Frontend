import { Injectable } from '@angular/core';
import { Worker } from '../Domain/Worker';
import * as firebase from 'firebase';
import { WorkersService } from '../services/dao/workers.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerActionsService {
  private functions = firebase.functions();
  
  constructor(private workersService: WorkersService) { }

  public deleteWorkerAsync(worker: Worker) {
    var deleteUserFunction = this.functions.httpsCallable('deleteUser');

    return deleteUserFunction(worker)
        .then(async () => {
            await this.workersService.deleteEntityAsync(worker.Email);
        }).catch((error) => console.log(error));
}
}
