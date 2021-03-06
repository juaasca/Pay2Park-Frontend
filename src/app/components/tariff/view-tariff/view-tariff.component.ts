import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TariffActionsService } from 'src/app/logic/tariff.actions.service';
import { Tariff } from 'src/app/Domain/Tariff';
import { SelectedTariff } from '../selected.tariff';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-tariff',
  templateUrl: './view-tariff.component.html',
  styleUrls: ['./view-tariff.component.scss', '../../../globalCSS/common.scss'],
})
export class ViewTariffComponent implements OnInit {
  private selectedTariff: Tariff = null;
  private viewTariffForm: FormGroup;
  private isRealTimeChecked: boolean;
  private currentTariff: Tariff = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tariffActionsService: TariffActionsService,
    private alertController: AlertController
    ) {
      this.viewTariffForm = this.formBuilder.group({
        Description: new FormControl('', Validators.required),
        Duration: new FormControl ('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ])),
        Price: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$'),
        ])),
        IsRealTime: [false]
      })
    }

  ngOnInit() {
    this.selectedTariff = SelectedTariff.selectedTariff;
    
    this.viewTariffForm.controls['Description'].setValue(this.selectedTariff.Description);
    this.viewTariffForm.controls['Duration'].setValue(this.selectedTariff.Duration);
    this.viewTariffForm.controls['Price'].setValue(this.selectedTariff.Price);
    this.viewTariffForm.controls['IsRealTime'].setValue(this.selectedTariff.IsRealTime);
    
    this.isRealTimeChecked = this.selectedTariff.IsRealTime;
  }

  checkRealTime(){
      this.isRealTimeChecked = !this.isRealTimeChecked;

      if (this.isRealTimeChecked) {
        this.viewTariffForm.controls['Duration'].setValue(0);
      } else {
        this.viewTariffForm.controls['Duration'].setValue(this.selectedTariff.Duration);
      }
  }

  acceptButtonClicked() {
    var formValue = this.viewTariffForm.value;

    this.currentTariff = new Tariff(this.isRealTimeChecked, formValue.Description, +formValue.Price, +formValue.Duration);

    var hasBeenModified = !this.currentTariff.Equals(this.selectedTariff);

    if (hasBeenModified) {
      this.showTariffHasBeenModifiedAlert();
    } else {
      this.back();
    }
  }

  deleteButtonClickedAsync() {
    return this.showDeleteTariffAlertAsync();
  }

  updateTariff() {
    this.tariffActionsService.updateExistingTariffAsync(this.selectedTariff, this.currentTariff)
      .then(() => this.showTariffSuccesfullyUpdatedAsync())
      .catch(() => this.showErrorUpdatingTariffAsync());
  }

  async showTariffHasBeenModifiedAlert() {
    const alert = await this.alertController.create({
        header: '¡Atención!',
        message:
            'La tarifa ha sido modificada. ¿Desea guardar los cambios?',
        buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                this.updateTariff();
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

  async showDeleteTariffAlertAsync() {
    const alert = await this.alertController.create({
			header: 'Eliminar tarifa',
			message: '¿Está seguro de que desea eliminar esta tarifa? Esta acción no podrá deshacerse.',
			buttons: [
        {
          text: 'Confirmar',
					handler: async () => {
            await this.tariffActionsService.deleteTariffAsync(this.selectedTariff);
            
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

  async showTariffSuccesfullyUpdatedAsync() {
    const alert = await this.alertController.create({
			header: '¡Éxito!',
			message: 'La tarifa ha sido actualizada con éxito.',
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

  async showErrorUpdatingTariffAsync() {
    const alert = await this.alertController.create({
			header: '¡Error!',
			message: 'Se ha producido un error inesperado al actualizar la tarifa. ¿Desea intentarlo de nuevo?',
			buttons: [
        {
          text: 'Aceptar',
					handler: async () => {
            this.updateTariff();
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

  back() {
    this.router.navigateByUrl('/main/admin/tariff');
  }
}