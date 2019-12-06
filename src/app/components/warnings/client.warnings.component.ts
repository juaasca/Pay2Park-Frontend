import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { ViewLocationsComponent } from '../common/warnings/view.locations/view.locations.component';

@Component({
  selector: 'app-warnings',
  templateUrl: '../common/warnings/view.locations/view.locations.component.html',
  styleUrls: ['../common/warnings/view.locations/view.locations.component.scss'],
})
export class ClientWarningsComponent extends ViewLocationsComponent {
  constructor(router: Router, locationActionsService: LocationActionsService) {
    super(router, locationActionsService);
  }
}