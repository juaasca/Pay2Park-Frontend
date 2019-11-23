import { Injectable } from '@angular/core';
import { SubscriptionService } from '../services/dao/subscription.service';
import { Subscription } from '../Domain/Subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsActionsService {

  constructor(private subscriptionService: SubscriptionService) { }

  registerNewSubscriptionAsync(subscription: Subscription) {
    return this.subscriptionService.addEntityAsync(subscription.Identifier, subscription);
  }
}
