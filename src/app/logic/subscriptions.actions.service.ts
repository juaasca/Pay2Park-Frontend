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

  updateExistingSubscriptionAsync(originalSubscription: Subscription, updatedSubscription: Subscription) {
    return this.subscriptionService.deleteEntityAsync(originalSubscription.Identifier)
      .then(() => { return this.subscriptionService.addEntityAsync(updatedSubscription.Identifier, updatedSubscription) });
  }

  deleteSubscriptionAsync(subscription: Subscription) {
    return this.subscriptionService.deleteEntityAsync(subscription.Identifier);
  }

  getSubscriptionsOrderedByDurationAsync() {
    return this.subscriptionService.getEntitiesAsync().then((subscriptions) => {
      return subscriptions.sort((a, b) => this.sortSubscriptionByDuration(a, b));
    });
  }

  private sortSubscriptionByDuration(first: Subscription, second: Subscription) {
    var firstDuration = first.DurationInDays;
    var secondDuration = second.DurationInDays;

    if (firstDuration < secondDuration) {
      return -1;
    } else if (firstDuration > secondDuration) {
      return 1;
    } else {
      return 0;
    }
  }
}
