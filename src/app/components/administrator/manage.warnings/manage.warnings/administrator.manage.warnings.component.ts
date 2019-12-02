import { Component, OnInit } from '@angular/core';
import { WarningsComponent } from 'src/app/components/common/view.warnings/warnings.component';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';

@Component({
  selector: 'app-manage.warnings',
  templateUrl: '../../../common/view.warnings/warnings.component.html',
  styleUrls: ['../../../common/view.warnings/warnings.component.scss'],
})
export class AdministratorWarningsComponent extends WarningsComponent {
  constructor(router: Router, locationActionsService: LocationActionsService) {
    super(router, locationActionsService);

    this.isAdministrator = true;
  }

  create() {
    this.router.navigateByUrl('main/admin/manage-warnings/create-warning');
  }
}
