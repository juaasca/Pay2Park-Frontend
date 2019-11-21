import { Injectable } from '@angular/core';
import { PersistenceService } from './persistence.service';
import { Subscription } from 'src/app/Domain/Subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends PersistenceService<Subscription> {
  private subscriptionReference: firebase.database.Reference;
  private subscriptionDataBaseUrl = 'subscriptions';

  constructor() {
      super();
      this.subscriptionReference = this.ref.child(this.subscriptionDataBaseUrl);
      this.databaseRef = this.subscriptionReference;
  }
}
