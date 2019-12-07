import { Component, OnInit } from '@angular/core';
import { RecognisedPlates } from '../RecognisedPlates';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectedPlate } from '../../selectedPlate';

@Component({
  selector: 'app-choose.plate',
  templateUrl: './choose.plate.component.html',
  styleUrls: ['./choose.plate.component.scss'],
})
export class ChoosePlateComponent implements OnInit {
  private recognisedPlates: string[] = [];
  protected choosePlateForm: FormGroup;

  constructor(protected formBuilder: FormBuilder, protected router: Router) {
    this.choosePlateForm = this.formBuilder.group({
      ChosenPlate: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
    this.recognisedPlates = RecognisedPlates.RecognisedPlates;
  }

  acceptButtonClicked() {
    SelectedPlate.selectedPlate = this.choosePlateForm.value.ChosenPlate;

    this.router.navigateByUrl('main/checker/check-plate');
  }

  repeatScan() {
    this.router.navigateByUrl('main/checker/scan');
  }
}