import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/Domain/Location';
import { Warning } from 'src/app/Domain/Warning';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { SelectedLocation } from '../selectedLocation';
import { SelectedWarning } from '../selected.warning';
import { CurrentUserData } from 'src/app/data/current.user';
import { WindowStats } from 'src/app/data/window.status';

@Component({
  selector: 'app-manage-warnings',
  templateUrl: './view.location.warnings.component.html',
  styleUrls: ['./view.location.warnings.component.scss', '../../../../globalCSS/common.scss'],
})
export class ViewLocationWarnings implements OnInit {
  private selectedLocation: Location;
  private warnings: Warning[] = [];
  color: string;
  constructor(
    private router: Router,
    private locationActionsService: LocationActionsService) {
    this.color = CurrentUserData.color;

    setInterval(() => {
      this.color = CurrentUserData.color;
    }, 1000);
  }

  ngOnInit() {
    this.selectedLocation = SelectedLocation.selectedLocation;

    this.updateWarnings();

    setInterval(async () => {
      await this.updateWarnings();
    }, 3000);
  }

  updateWarnings() {
    return this.locationActionsService.getLocationByNameAsync(this.selectedLocation.Name)
      .then((location) => {
        if (location.Warnings === undefined) {
          this.warnings = [];
        } else {
          this.warnings = location.Warnings.sort((a, b) => this.sortWarningAscendingByDate(a, b));
        }
      });
  }

  viewWarning(warning: Warning) {
    SelectedWarning.SelectedWarning = warning;

    if (WindowStats.AdminWindowIsActive) {
      this.router.navigateByUrl('main/admin/manage-warnings/edit-warning');
    } else {
      this.router.navigateByUrl('main/warnings/view-warning');
    }
  }

  sortWarningAscendingByDate(firstWarning: Warning, secondWarning: Warning) {
    var warningA = firstWarning.InitialDate;
    var warningB = secondWarning.InitialDate;

    if (warningA > warningB) {
      return -1;
    } else if (warningA < warningB) {
      return 1;
    } else {

      return 0;
    }
  }

  dateToString(date: Date) {
    date = new Date(date);

    return `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
  }
}
