import { Component } from '@angular/core';
import { ViewLocationsComponent } from 'src/app/components/common/warnings/view.locations/view.locations.component';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';

@Component({
  selector: 'app-manage.warnings',
  templateUrl: '../../common/warnings/view.locations/view.locations.component.html',
  styleUrls: ['../../common/warnings/view.locations/view.locations.component.scss'],
})
export class AdministratorWarningsComponent extends ViewLocationsComponent {
  constructor(router: Router, locationActionsService: LocationActionsService) {
    super(router, locationActionsService);
    this.isAdministrator = true;
    this.viewWarningsByLocationRoute = 'main/admin/manage-warnings/view-warnings-by-location';
  }

  create() {
    this.router.navigateByUrl('main/admin/manage-warnings/create-warning');
  }
}
