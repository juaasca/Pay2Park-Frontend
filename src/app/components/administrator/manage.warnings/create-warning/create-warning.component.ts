import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { Location } from 'src/app/Domain/Location';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DateValidatorService } from 'src/app/services/validators/date.validator.service';

@Component({
  selector: 'app-create-warning',
  templateUrl: './create-warning.component.html',
  styleUrls: ['./create-warning.component.scss'],
})
export class CreateWarningComponent implements OnInit {
  private locations: Location[] = [];
  private createWarningForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private locationActionsService: LocationActionsService) {
    this.updateLocations();
    this.createWarningForm = this.formBuilder.group({
      Title: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      Description: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      InitialDateTime: new FormControl('', Validators.compose([
        Validators.required,
        this.initialDateLaterNow,
      ])),
      FinalDateTime: new FormControl('', Validators.compose([
        Validators.required,
        this.finalDateLater
      ])),
      Locations: new FormControl('', Validators.compose([
        Validators.required,
      ]))
    });
  }

  ngOnInit() {}

  updateLocations(){
    return this.locationActionsService.getLocationsAsync()
      .then((locations) => {
        this.locations = locations.sort((a, b) => this.sortLocationAscendingByName(a, b));
      });
  }

  sortLocationAscendingByName(firstLocation: Location, secondLocation: Location) {
    var nameA = firstLocation.Name.toLowerCase();
    var nameB = secondLocation.Name.toLowerCase();
    
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  }

  initialDateLaterNow(fc: FormControl){
    var now = new Date();

    if(now < fc.value){
      return ({initialDateLaterNow: true});
    } else {
      return (null);
    }
  }

  finalDateLater()
  { return (field: FormControl): {[key: string] : any} => {
      if(field.get('InitialDateTime').value < field.get('FinalDateTime').value){
        return ({finalDateLater: true});
      } else {
        return (null);
      } 
    }
  }

  saveData(){
    var formValue = this.createWarningForm.value;
  }
}
