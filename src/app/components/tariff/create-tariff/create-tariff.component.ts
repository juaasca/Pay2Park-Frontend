import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tariff',
  templateUrl: './create-tariff.component.html',
  styleUrls: ['./create-tariff.component.scss'],
})
export class CreateTariffComponent implements OnInit {
  private createTariff: FormGroup;
  constructor(
    router: Router,
    private formBuilder: FormBuilder) {
      this.createTariff = this.formBuilder.group({
        Description: ['', Validators.required],
        Time: ['', Validators.required],
        Price: ['', Validators.required],
        realTime: ['false']
      })  
    }

  ngOnInit() {}

}
