import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TariffActionsService } from 'src/app/logic/tariff.actions.service';
import { Tariff } from 'src/app/Domain/Tariff';

@Component({
  selector: 'app-create-tariff',
  templateUrl: './create-tariff.component.html',
  styleUrls: ['./create-tariff.component.scss'],
})
export class CreateTariffComponent implements OnInit {
  private createTariffForm: FormGroup;
  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private tariffActionsService: TariffActionsService
    ) {
      this.createTariffForm = this.formBuilder.group({
        Description: ['', Validators.required],
        Duration: ['', Validators.required],
        Price: ['', Validators.required],
        IsRealTime: ['false']
      })  
    }

  ngOnInit() {}

  acceptButtonClicked() {
    var formValue = this.createTariffForm.value;

    let tariffToCreate = new Tariff(formValue.IsRealTime, formValue.Description, formValue.Price, formValue.Duration);

    // TODO: Manage the returned Promise.
    this.tariffActionsService.registerNewTariffAsync(tariffToCreate);
  }

}
