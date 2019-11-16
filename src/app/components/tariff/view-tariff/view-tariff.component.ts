import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TariffActionsService } from 'src/app/logic/tariff.actions.service';
import { Tariff } from 'src/app/Domain/Tariff';
import { SelectedTariff } from '../selected.tariff';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-tariff',
  templateUrl: './view-tariff.component.html',
  styleUrls: ['./view-tariff.component.scss'],
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
        Description: ['', Validators.required],
        Duration: ['', Validators.required],
        Price: ['', Validators.required],
        IsRealTime: ['']
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
  }

  acceptButtonClicked() {
    var formValue = this.viewTariffForm.value;

    this.currentTariff = new Tariff(formValue.IsRealTime, formValue.Description, +formValue.Price, +formValue.Duration);

    var hasBeenModified = !this.currentTariff.Equals(this.selectedTariff);

    if (hasBeenModified) {
      this.showTariffHasBeenModifiedAlert();
    } else {
      this.back();
    }
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
                  this.tariffActionsService.updateExistingTariffAsync(this.selectedTariff, this.currentTariff);
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

  async deleteTariffAsync() {
    const alert = await this.alertController.create({
			header: 'Eliminar tarifa',
			message: '¿Está seguro que desea eliminar esta tarifa? Esta acción no podrá deshacerse.',
			buttons: [
				{
					text: 'Cancelar',
					handler: () => {
						alert.dismiss();
					},
				},
				{
					text: 'Confirmar',
					handler: async () => {
            await this.tariffActionsService.deleteTariffAsync(this.selectedTariff);
            
            this.router.navigateByUrl("main/admin/tariff");
					},
				},
			],
		});

		await alert.present();
  }

  back() {
    this.router.navigateByUrl('/main/admin/tariff');
  }
}