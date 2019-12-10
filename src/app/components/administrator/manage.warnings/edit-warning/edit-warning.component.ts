import { Component } from '@angular/core';
import { ViewWarningComponent } from 'src/app/components/common/warnings/view-warning/view-warning.component';
import { FormBuilder } from '@angular/forms';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { Router } from '@angular/router';
import { SelectedWarning } from 'src/app/components/common/warnings/selected.warning';
import { SelectedLocation } from 'src/app/components/common/warnings/selectedLocation';
import { AlertController } from '@ionic/angular';
import { Location } from 'src/app/Domain/Location';

@Component({
  selector: 'app-edit-warning',
  templateUrl: '../../../common/warnings/view-warning/view-warning.component.html',
  styleUrls: ['../../../common/warnings/view-warning/view-warning.component.scss'],
})
export class EditWarningComponent extends ViewWarningComponent {
  constructor(
    formBuilder: FormBuilder,
    router: Router,
    locationActionsService: LocationActionsService,
    private alertController: AlertController)
  {
    super(formBuilder, router, locationActionsService);
    this.componentTitle = 'Ver aviso';
    this.canEditWarning = true;
  }
  
  customOnInit() {
    this.selectedWarning = SelectedWarning.SelectedWarning;

    this.viewWarningForm.controls['Title'].setValue(this.selectedWarning.Title);
    this.viewWarningForm.controls['Description'].setValue(this.selectedWarning.Description);
    this.viewWarningForm.controls['InitialDateTime'].setValue(this.selectedWarning.InitialDate);
    this.viewWarningForm.controls['FinalDateTime'].setValue(this.selectedWarning.FinishDate);
    this.viewWarningForm.controls['Locations'].disable({onlySelf: true, emitEvent: false});
    this.viewWarningForm.controls['WarningType'].setValue(this.selectedWarning.WarningType);
  }

  acceptButtonClicked() {
    this.back();
  }

  deleteButtonClickedAsync() {
    this.showDeletionConfirmationAlert();    
  }

  deleteWarning() {
    var originalLocation = SelectedLocation.selectedLocation;
    var updatedLocation = new Location(originalLocation.Name);

    updatedLocation.setWarnings(originalLocation.Warnings);
    updatedLocation.removeWarning(SelectedWarning.SelectedWarning);

    this.locationActionsService.updateExistingLocation(originalLocation, updatedLocation)
      .catch(() => this.showErrorDeletingWarningAlert());

    this.back();
  }

  back() {
    this.router.navigateByUrl('main/admin/manage-warnings/view-warnings-by-location');
  }

  async showDeletionConfirmationAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Desea eliminar el aviso seleccionado para ${SelectedLocation.selectedLocation.Name}?`,
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.deleteWarning();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            alert.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  async showErrorDeletingWarningAlert() {
    const alert = await this.alertController.create({
        header: '¡Error!',
        message:
            'Ha ocurrido un error inesperado al eliminar el aviso de la ciudad seleccionada. ¿Desea intentarlo de nuevo?',
        buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                  this.deleteButtonClickedAsync();
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
