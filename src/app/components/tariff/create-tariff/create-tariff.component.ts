import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
  private isRealTimeChecked: boolean;
  constructor(
    router: Router,
    private formBuilder: FormBuilder,
    private tariffActionsService: TariffActionsService
    ) {
      this.createTariffForm = this.formBuilder.group({
        Description: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ])),
        Duration: new FormControl ('', Validators.required),
        Price: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$'),
        ])),
        IsRealTime: new FormControl ['false']
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

    let tariffToCreate = new Tariff(formValue.IsRealTime, formValue.Description, formValue.Price, formValue.Duration);

    // TODO: Manage the returned Promise.
    this.tariffActionsService.registerNewTariffAsync(tariffToCreate);
  }

}
