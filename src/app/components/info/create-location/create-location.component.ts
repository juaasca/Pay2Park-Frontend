import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { AlertController } from '@ionic/angular';
import { Location } from 'src/app/Domain/Location';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.scss', './../../../../formulario.scss'],
})
export class CreateLocationComponent implements OnInit {
  private createLocationForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private locationActionsService: LocationActionsService,
    private alertController: AlertController
  ) {
    this.createLocationForm = this.formBuilder.group({
      Name: new FormControl ('', Validators.compose([
        Validators.required,
        Validators.pattern('^[ A-Za-z]+$'),
      ]))
   });
  }
  ngOnInit() {}

  acceptButtonClicked() {
    var formValue = this.createLocationForm.value;

    let locationToCreate = new Location(formValue.Name);

    this.locationActionsService.registerNewLocationAsync(locationToCreate)
      .then(() => this.showLocationHasBeenSuccesfullyCreatedAlert())
      .catch(() => this.showErrorCreatingLocationAlert());
  }

  async showLocationHasBeenSuccesfullyCreatedAlert() {
    const alert = await this.alertController.create({
        header: '¡Éxito!',
        message:
            '¡Localidad creada con éxito!',
        buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                  this.router.navigateByUrl("info");
              },
            }
        ],
    });
    await alert.present();
  }

  async showErrorCreatingLocationAlert() {
    const alert = await this.alertController.create({
        header: '¡Error!',
        message:
            'Ha ocurrido un error inesperado añadiendo la localdad. ¿Desea intentarlo de nuevo?',
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
