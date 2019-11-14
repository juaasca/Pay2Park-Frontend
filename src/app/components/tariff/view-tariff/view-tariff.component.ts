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
  private selectedTariff: Tariff = null;
  private viewTariffForm: FormGroup;
  private isRealTimeChecked: boolean;
  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private tariffActionsService: TariffActionsService
    ) {
    }

  ngOnInit() {
    this.selectedTariff = SelectedTariff.selectedTariff;
    this.isRealTimeChecked = SelectedTariff.selectedTariff.IsRealTime;

    this.viewTariffForm = this.formBuilder.group({
      Description: [this.selectedTariff.Description, Validators.required],
      Duration: [this.selectedTariff.Duration, Validators.required],
      Price: [this.selectedTariff.Price, Validators.required],
      IsRealTime: [this.selectedTariff.IsRealTime]
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

    return this.selectedTariff === currentTariff;
  }

}
