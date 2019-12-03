import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { WarningsComponent } from '../common/warnings/view.warnings/warnings.component';

@Component({
  selector: 'app-warnings',
  templateUrl: '../common/warnings/view.warnings/warnings.component.html',
  styleUrls: ['../common/warnings/view.warnings/warnings.component.scss'],
})
export class ClientWarningsComponent extends WarningsComponent {
  constructor(router: Router, locationActionsService: LocationActionsService) {
    super(router, locationActionsService);
  }
}