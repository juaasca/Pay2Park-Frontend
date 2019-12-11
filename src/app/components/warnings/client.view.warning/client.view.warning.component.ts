import { Component } from '@angular/core';
import { ViewWarningComponent } from '../../common/warnings/view-warning/view-warning.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { SelectedWarning } from '../../common/warnings/selected.warning';

@Component({
  selector: 'app-client.view.warning',
  templateUrl: '../../common/warnings/view-warning/view-warning.component.html',
  styleUrls: ['../../common/warnings/view-warning/view-warning.component.scss', '../../../globalCSS/common.scss'],
})
export class ClientViewWarningComponent extends ViewWarningComponent {
  constructor(
    formBuilder: FormBuilder,
    router: Router,
    locationActionsService: LocationActionsService)
  {
    super(formBuilder, router, locationActionsService);
  }

  customOnInit() {
    this.selectedWarning = SelectedWarning.SelectedWarning;

    this.viewWarningForm.controls['Title'].setValue(this.selectedWarning.Title);
    this.viewWarningForm.controls['Description'].setValue(this.selectedWarning.Description);
    this.viewWarningForm.controls['InitialDateTime'].setValue(this.selectedWarning.InitialDate);
    this.viewWarningForm.controls['FinalDateTime'].setValue(this.selectedWarning.FinishDate);
    this.viewWarningForm.controls['Locations'].disable({onlySelf: true, emitEvent: false});
    this.viewWarningForm.controls['WarningType'].setValue(this.selectedWarning.WarningType);
  }

  acceptButtonClicked() {
    this.router.navigateByUrl('main/warnings/view-warnings-by-location');
  }
  
  deleteButtonClickedAsync() {
    throw new Error("Method not implemented.");
  }
}
