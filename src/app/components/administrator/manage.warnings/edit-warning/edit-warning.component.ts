import { Component, OnInit } from '@angular/core';
import { ViewWarningComponent } from 'src/app/components/common/warnings/view-warning/view-warning.component';
import { FormBuilder } from '@angular/forms';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-warning',
  templateUrl: '../../../common/warnings/view-warning/view-warning.component.html',
  styleUrls: ['../../../common/warnings/view-warning/view-warning.component.scss'],
})
export class EditWarningComponent extends ViewWarningComponent {
  constructor(formBuilder: FormBuilder, router: Router, locationActionsService: LocationActionsService) {
    super(formBuilder, router, locationActionsService);
    this.componentTitle = 'Ver aviso';
    this.canEditWarning = true;
  }
  
  customOnInit() {
  }

  acceptButtonClicked() {
    throw new Error("Method not implemented.");
  }
  deleteButtonClickedAsync() {
    throw new Error("Method not implemented.");
  }
}
