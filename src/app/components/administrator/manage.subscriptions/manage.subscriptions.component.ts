import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'src/app/Domain/Subscription';
import { SelectedSubscription } from './selected.subscription';
import { SubscriptionsActionsService } from 'src/app/logic/subscriptions.actions.service';

@Component({
  selector: 'app-manage.subscriptions',
  templateUrl: './manage.subscriptions.component.html',
  styleUrls: ['./manage.subscriptions.component.scss'],
})
export class ManageSubscriptionsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  private showMulticar: boolean = false;
  segment: any;

  constructor(
    private router: Router,
    private subscriptionsActions: SubscriptionsActionsService
  ) {}

  ngOnInit() {
    this.updateSubscriptions();
    
    setInterval(() => {
      this.updateSubscriptions();
    }, 1000);
  }

  simpleSelected() {
    this.showMulticar = false;
    this.updateSubscriptions();
  }

  multiCarSelected() {
    this.showMulticar = true;
    this.updateSubscriptions();
  }

  create(){
    this.router.navigateByUrl('main/admin/manage-subscriptions/create-subscription');
  }

  manage(subscription){
    var selectedSubscription = <Subscription> subscription;
    SelectedSubscription.SelectedSubscription = selectedSubscription;
    
    this.router.navigateByUrl('main/admin/manage-subscriptions/view-subscription');
  }

  updateSubscriptions(){
    this.subscriptionsActions.getSubscriptionsOrderedByDurationAsync()
      .then((subscriptions) => this.subscriptions = subscriptions.filter((subscription) => subscription.IsMultiCar == this.showMulticar));
  }  
}
