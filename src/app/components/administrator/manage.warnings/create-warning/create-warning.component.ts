import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { FormBuilder } from '@angular/forms';
import { ViewWarningComponent } from 'src/app/components/common/warnings/view-warning/view-warning.component';
import { Warning } from 'src/app/Domain/Warning';
import { Location } from 'src/app/Domain/Location';

@Component({
  selector: 'app-create-warning',
  templateUrl: '../../../common/warnings/view-warning/view-warning.component.html',
  styleUrls: ['../../../common/warnings/view-warning/view-warning.component.scss'],
})
export class CreateWarningComponent extends ViewWarningComponent {
  constructor(formBuilder: FormBuilder, router: Router, locationActionsService: LocationActionsService) {
    super(formBuilder, router, locationActionsService);
    this.componentTitle = 'CREAR AVISO';
  }
  
  customOnInit() {};
  
  acceptButtonClicked() {
    var formValue = this.viewWarningForm.value;
    var createdWarning = new Warning(formValue.Title, formValue.Description, <Date>formValue.InitialDateTime, <Date>formValue.FinalDateTime);
    
    (<string[]>formValue.Locations).forEach(async (locationName) => {
      var originalLocation = await this.locationActionsService.getLocationByNameAsync(locationName.trim());
      var updatedLocation = this.addWarningToExistingLocation(originalLocation, createdWarning);
      
      await this.locationActionsService.updateExistingLocation(originalLocation, updatedLocation);
    });
  }
      
  private addWarningToExistingLocation(originalLocation: Location, createdWarning: Warning) {
    var updatedLocation = new Location(originalLocation.Name);
    if (originalLocation.Warnings === undefined) {
      updatedLocation.setWarnings([createdWarning]);
    }
    else {
      updatedLocation.setWarnings(originalLocation.Warnings);
      updatedLocation.addWarning(createdWarning);
    }
    return updatedLocation;
  }

  deleteButtonClickedAsync() {
    throw new Error("Method not implemented.");
  }
}
