import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

export abstract class SubscriptionFormComponent implements OnInit {
  protected createSubscriptionForm: FormGroup;
  protected isMultiCarChecked: boolean;
  protected componentTitle: string;
  protected canDeleteSubscription: boolean = false;
  protected backRoute: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createSubscriptionForm = this.formBuilder.group({
      Name: new FormControl('', Validators.required),
      Duration: new FormControl ('', Validators.compose([
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
      ])),
      Price: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$'),
      ])),
      IsMultiCar: [false]
    })
  }

  abstract ngOnInit();
  abstract acceptButtonClicked();
  abstract deleteButtonClickedAsync();

  checkMultiCar() {
    this.isMultiCarChecked = !this.isMultiCarChecked;
  }

  back() {
    this.router.navigateByUrl(this.backRoute);
  }

  protected validation_messages = {
    Name: [
        { type: 'required', message: '· El nombre es obligatorio.' },
    ],
    Duration: [
        { type: 'required', message: '· La duración es obligatoria.' },
        { type: 'pattern', message: 'La duración debe expresarse con un número que no empiece por 0.', },
    ],
    Price: [
        { type: 'required', message: '· El precio es obligatorio.', },
        { type: 'pattern', message: '· El precio solo puede contener números. En caso de decimal debe utilizarse el punto.', },
    ]
  };
}