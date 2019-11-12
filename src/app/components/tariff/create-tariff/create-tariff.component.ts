import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    ) {
      this.createTariffForm = this.formBuilder.group({
        Description: ['', Validators.required],
        Duration: ['', Validators.required],
        Price: ['', Validators.required],
        IsRealTime: ['false']
      })  
    }

  ngOnInit() {}

}
