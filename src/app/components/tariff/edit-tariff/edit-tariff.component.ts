import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TariffActionsService } from 'src/app/logic/tariff.actions.service';
import { Tariff } from 'src/app/Domain/Tariff';
import { SelectedTariff } from '../selected.tariff';

@Component({
  selector: 'app-edit-tariff',
  templateUrl: './edit-tariff.component.html',
  styleUrls: ['./edit-tariff.component.scss'],
})
export class EditTariffComponent implements OnInit {
  private checkTariffForm: FormGroup;
  private isRealTimeChecked: boolean;
  private originalTariff: Tariff;
  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private tariffActionsService: TariffActionsService
    ) {
    }

  ngOnInit() {
    this.originalTariff = new Tariff(false, "Una descripción de prueba.", 10, 40);
    this.isRealTimeChecked = false;

    this.checkTariffForm = this.formBuilder.group({
      Description: [this.originalTariff.Description, Validators.required],
      Duration: [this.originalTariff.Duration, Validators.required],
      Price: [this.originalTariff.Price, Validators.required],
      IsRealTime: [this.originalTariff.IsRealTime]
    })
  }

  checkRealTime(){
      this.isRealTimeChecked = !this.isRealTimeChecked;
  }

  acceptButtonClicked() {
    var formValue = this.checkTariffForm.value;

    let tariffToCreate = new Tariff(formValue.IsRealTime, formValue.Description, formValue.Price, formValue.Duration);

    // TODO: Manage the returned Promise.
    this.tariffActionsService.registerNewTariffAsync(tariffToCreate);
  }

  hasBeenModified() {
    var formValue = this.checkTariffForm.value;
    var currentTariff = new Tariff(formValue.IsRealTime, formValue.Description, formValue.Price, formValue.Duration);

    return this.originalTariff === currentTariff;
  }

}
