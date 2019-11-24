import { Component, OnInit } from '@angular/core';
import { SubscriptionFormComponent } from '../common/subscription-form/subscription-form.component';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'src/app/Domain/Subscription';
import { SelectedSubscription } from '../selected.subscription';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SubscriptionsActionsService } from 'src/app/logic/subscriptions.actions.service';

@Component({
  selector: 'app-view.subscription',
  templateUrl: '../common/subscription-form/subscription-form.component.html',
  styleUrls: ['../common/subscription-form/subscription-form.component.scss'],
})
export class ViewSubscriptionComponent extends SubscriptionFormComponent implements OnInit {
  private originalSubscription: Subscription;
  private currentSubscription: Subscription;

  constructor(
    formBuilder: FormBuilder,
    router: Router,
    private alertController: AlertController,
    private subscriptionActionsService: SubscriptionsActionsService
  ) {
    super(formBuilder, router);

    this.componentTitle = 'Ver bono';
    this.canDeleteSubscription = true;
    this.backRoute = 'main/admin/manage-subscriptions';
  }
  
  ngOnInit() {
    this.originalSubscription = SelectedSubscription.SelectedSubscription;

    this.createSubscriptionForm.controls['Name'].setValue(this.originalSubscription.Name);
    this.createSubscriptionForm.controls['Duration'].setValue(this.originalSubscription.DurationInDays);
    this.createSubscriptionForm.controls['Price'].setValue(this.originalSubscription.Price);
    this.createSubscriptionForm.controls['IsMultiCar'].setValue(this.originalSubscription.IsMultiCar);
  }
  
  acceptButtonClicked() {
    var formValue = this.createSubscriptionForm.value;

    this.currentSubscription = new Subscription(formValue.Name, +formValue.Duration, +formValue.Price, formValue.IsMultiCar);

    var hasBeenModified = !this.currentSubscription.Equals(this.originalSubscription);

    if (hasBeenModified) {
      this.showSubscriptionHasBeenModifiedAlert();
    } else {
      this.back();
    }
  }

  deleteButtonClickedAsync() {
    return this.showDeleteSubscriptionAlertAsync();
  }

  updateSubscription() {
    return this.subscriptionActionsService.updateExistingSubscriptionAsync(this.originalSubscription, this.currentSubscription)
      .then(() => this.showSubscriptionSuccesfullyUpdatedAsync())
      .catch(() => this.showErrorUpdatingSubscriptionAsync());
  }

  async showSubscriptionHasBeenModifiedAlert() {
    const alert = await this.alertController.create({
        header: '¡Atención!',
        message:
            'El bono ha sido modificado. ¿Desea guardar los cambios?',
        buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.updateSubscription();
              },
            },
            {
              text: 'Cancelar',
              handler: () => {
                alert.dismiss();
              }
            }
        ],
    });

    await alert.present();
  }

  async showDeleteSubscriptionAlertAsync() {
    const alert = await this.alertController.create({
			header: 'Eliminar bono',
			message: '¿Está seguro de que desea eliminar este bono? Esta acción no podrá deshacerse.',
			buttons: [
        {
          text: 'Confirmar',
					handler: async () => {
            await this.subscriptionActionsService.deleteSubscriptionAsync(this.originalSubscription);
            
            this.back();
					},
				},
        {
          text: 'Cancelar',
          handler: () => {
            alert.dismiss();
          },
        }
			],
		});

		await alert.present();
  }

  async showSubscriptionSuccesfullyUpdatedAsync() {
    const alert = await this.alertController.create({
			header: '¡Éxito!',
			message: 'El bono ha sido actualizado con éxito.',
			buttons: [
        {
          text: 'Aceptar',
					handler: async () => {
            this.back();
					},
				}
			],
		});

		await alert.present();
  }

  async showErrorUpdatingSubscriptionAsync() {
    const alert = await this.alertController.create({
			header: '¡Error!',
			message: 'Se ha producido un error inesperado al actualizar el bono. ¿Desea intentarlo de nuevo?',
			buttons: [
        {
          text: 'Aceptar',
					handler: async () => {
            this.updateSubscription();
					},
        },
        {
          text: 'Cancelar',
          handler: async () => {
            this.back();
          }
        }
			],
		});

		await alert.present();
  }
}
