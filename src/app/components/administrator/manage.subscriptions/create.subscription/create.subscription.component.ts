import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'src/app/Domain/Subscription';
import { SubscriptionsActionsService } from 'src/app/logic/subscriptions.actions.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SubscriptionFormComponent } from '../common/subscription-form/subscription-form.component';

@Component({
  selector: 'app-create.subscription',
  templateUrl: '../common/subscription-form/subscription-form.component.html',
  styleUrls: ['../common/subscription-form/subscription-form.component.scss', '../../../../globalCSS/common.scss'],
})
export class CreateSubscriptionComponent extends SubscriptionFormComponent {
  constructor(
    formBuilder: FormBuilder,
    router: Router,
    private subscriptionsActions: SubscriptionsActionsService,
    private alertController: AlertController
    ) {
      super(formBuilder, router);
      
      this.componentTitle = 'Crear bono';
      this.backRoute = 'main/admin/manage-subscriptions';
    }
    
    ngOnInit() {}
    
    acceptButtonClicked() {
      var formValue = this.createSubscriptionForm.value;
      var newSubscription = new Subscription(formValue.Name, +formValue.Duration, +formValue.Price, formValue.IsMultiCar);
      
      this.subscriptionsActions.registerNewSubscriptionAsync(newSubscription)
      .then(() => this.showSubscriptionHasBeenSuccesfullyCreatedAlert())
      .catch(() => this.showErrorCreatingTariffAlert());
    }
    
    deleteButtonClickedAsync() {}

    async showSubscriptionHasBeenSuccesfullyCreatedAlert() {
      const alert = await this.alertController.create({
        header: '¡Éxito!',
        message:
        '¡Bono creado con éxito!',
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              this.back();
            },
            }
        ],
    });

    await alert.present();
  }

  async showErrorCreatingTariffAlert() {
    const alert = await this.alertController.create({
        header: '¡Error!',
        message:
            'Ha ocurrido un error inesperado creando el bono. ¿Desea intentarlo de nuevo?',
        buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                  this.acceptButtonClicked();
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
}