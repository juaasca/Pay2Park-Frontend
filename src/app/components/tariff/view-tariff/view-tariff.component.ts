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
