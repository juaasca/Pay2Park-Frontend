import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'src/app/Domain/Subscription';
import { SubscriptionsActionsService } from 'src/app/logic/subscriptions.actions.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create.subscription',
  templateUrl: './create.subscription.component.html',
  styleUrls: ['./create.subscription.component.scss'],
})
export class CreateSubscriptionComponent implements OnInit {
  private createSubscriptionForm: FormGroup;
  private isMultiCarChecked: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private subscriptionsActions: SubscriptionsActionsService,
    private alertController: AlertController,
    private router: Router
  ) {
    this.createSubscriptionForm = this.formBuilder.group({
      Name: new FormControl('', Validators.required),
      Duration: new FormControl ('', Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ])),
      Price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$'),
      ])),
      IsMultiCar: [false]
    })
  }
  
  ngOnInit() {}
  
  checkMultiCar() {
    this.isMultiCarChecked = !this.isMultiCarChecked;
  }

  acceptButtonClicked() {
    var formValue = this.createSubscriptionForm.value;
    var newSubscription = new Subscription(formValue.Name, +formValue.Duration, +formValue.Price, formValue.IsMultiCar);

    this.subscriptionsActions.registerNewSubscriptionAsync(newSubscription)
      .then(() => this.showSubscriptionHasBeenSuccesfullyCreatedAlert())
      .catch(() => this.showErrorCreatingTariffAlert());
  }

  async showSubscriptionHasBeenSuccesfullyCreatedAlert() {
    const alert = await this.alertController.create({
        header: '¡Éxito!',
        message:
            '¡Bono creado con éxito!',
        buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                  this.router.navigateByUrl("main/admin/manage-subscriptions");
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

  protected validation_messages = {
    Name: [
        { type: 'required', message: '· El nombre es obligatorio.' },
    ],
    Duration: [
        { type: 'required', message: '· La duración es obligatoria.' },
        { type: 'pattern', message: 'La duración debe expresarse con un número que no empiece por 0.', },
    ],
    Price: [
        { type: 'required', message: '· El precio es obligatorio.', },
        { type: 'pattern', message: '· El precio solo puede contener números. En caso de decimal debe utilizarse el punto.', },
    ]
  };
}