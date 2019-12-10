import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { Location } from 'src/app/Domain/Location';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Warning } from 'src/app/Domain/Warning';
import { DateValidatorService } from 'src/app/services/validators/date.validator.service';
import { AlertController } from '@ionic/angular';
import { CurrentUserData } from 'src/app/data/current.user';

export abstract class ViewWarningComponent implements OnInit {
  protected locations: Location[] = [];
  protected viewWarningForm: FormGroup;
  protected componentTitle: string;
  protected canEditWarning = false;

  protected selectedWarning: Warning;
  color: string;
  private alertControl: AlertController;

  constructor(protected formBuilder: FormBuilder, protected router: Router, protected locationActionsService: LocationActionsService) {
    this.viewWarningForm = this.formBuilder.group({
      Title: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      Description: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      InitialDateTime: new FormControl('', Validators.compose([
        Validators.required,
        DateValidatorService.initialDateLaterNow
      ])),
      FinalDateTime: new FormControl('', Validators.compose([
        Validators.required
      ])),
      Locations: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      WarningType: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    this.color = CurrentUserData.color;

    setInterval(() => {
      this.color = CurrentUserData.color;
    }, 1000);
  }

  abstract acceptButtonClicked();
  abstract deleteButtonClickedAsync();

  ngOnInit() {
    this.updateLocations();
    this.customOnInit();
  }

  abstract customOnInit();

  updateLocations() {
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
}