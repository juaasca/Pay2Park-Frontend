import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { PersistenceService } from './persistence.service';
import { Warning } from 'src/app/Domain/Warning';

@Injectable({
    providedIn: 'root'
})

export class WarningService extends PersistenceService<Warning>{
  
  private refWarnings: firebase.database.Reference;
  private warningsDataBaseUrl: string = 'warning';

  constructor() {
    super();
    this.refWarnings = this.ref.child(this.warningsDataBaseUrl);
    this.databaseRef = this.refWarnings;
   }
}
