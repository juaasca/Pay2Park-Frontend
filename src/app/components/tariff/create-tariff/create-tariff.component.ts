import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TariffActionsService } from 'src/app/logic/tariff.actions.service';
import { Tariff } from 'src/app/Domain/Tariff';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-tariff',
  templateUrl: './create-tariff.component.html',
  styleUrls: ['./create-tariff.component.scss'],
})
export class CreateTariffComponent implements OnInit {
  private createTariffForm: FormGroup;
  private isRealTimeChecked: boolean;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private tariffActionsService: TariffActionsService,
    private alertController: AlertController
    ) {
      this.createTariffForm = this.formBuilder.group({
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
    this.isRealTimeChecked = false;
  }

  checkRealTime(){
      this.isRealTimeChecked = !this.isRealTimeChecked;
      
      if (this.isRealTimeChecked) {
        this.createTariffForm.controls['Duration'].setValue(0);
      } else {
        this.createTariffForm.controls['Duration'].setValue('');
      }
  }

  acceptButtonClicked() {
    var formValue = this.createTariffForm.value;

    let tariffToCreate = new Tariff(formValue.IsRealTime, formValue.Description, + formValue.Price, + formValue.Duration);

    this.tariffActionsService.registerNewTariffAsync(tariffToCreate)
      .then(() => this.showTariffHasBeenSuccesfullyCreatedAlert())
      .catch(() => this.showErrorCreatingTariffAlert());
  }

  async showTariffHasBeenSuccesfullyCreatedAlert() {
    const alert = await this.alertController.create({
        header: '¡Éxito!',
        message:
            '¡Tarifa creada con éxito!',
        buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                  this.router.navigateByUrl("main/admin/tariff");
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
            'Ha ocurrido un error inesperado creando la tarifa. ¿Desea intentarlo de nuevo?',
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
