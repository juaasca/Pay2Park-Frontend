import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TariffActionsService } from 'src/app/logic/tariff.actions.service';
import { Tariff } from 'src/app/Domain/Tariff';
import { SelectedTariff } from '../selected.tariff';

@Component({
  selector: 'app-view-tariff',
  templateUrl: './view-tariff.component.html',
  styleUrls: ['./view-tariff.component.scss'],
})
export class ViewTariffComponent implements OnInit {
  private viewTariffForm: FormGroup;
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

    this.viewTariffForm = this.formBuilder.group({
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
    var formValue = this.viewTariffForm.value;

    let tariffToCreate = new Tariff(formValue.IsRealTime, formValue.Description, formValue.Price, formValue.Duration);

    // TODO: Manage the returned Promise.
    this.tariffActionsService.registerNewTariffAsync(tariffToCreate);
  }

  hasBeenModified() {
    var formValue = this.viewTariffForm.value;
    var currentTariff = new Tariff(formValue.IsRealTime, formValue.Description, formValue.Price, formValue.Duration);

    return this.originalTariff === currentTariff;
  }

}
