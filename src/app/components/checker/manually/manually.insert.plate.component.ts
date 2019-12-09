import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SelectedPlate } from '../selectedPlate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manually',
  templateUrl: './manually.insert.plate.component.html',
  styleUrls: ['./manually.insert.plate.component.scss'],
})
export class ManuallyInsertPlateComponent implements OnInit {
  private manuallyInsertPlateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router)
  {
    this.manuallyInsertPlateForm = this.formBuilder.group({
      Plate: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  checkButtonClicked() {
    SelectedPlate.selectedPlate = this.manuallyInsertPlateForm.value.Plate;

    this.router.navigateByUrl('main/checker/check-plate');
  }
}