import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/Domain/Location';
import { Warning } from 'src/app/Domain/Warning';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { SelectedLocation } from '../selectedLocation';
import { SelectedWarning } from '../selected.warning';
import { CurrentUserData } from 'src/app/data/current.user';

@Component({
  selector: 'app-manage-warnings',
  templateUrl: './view.location.warnings.component.html',
  styleUrls: ['./view.location.warnings.component.scss'],
})
export class ViewLocationWarnings implements OnInit {
  private selectedLocation: Location;
  private warnings: Warning[]=[];
  
  constructor(
    private router: Router,
    private locationActionsService: LocationActionsService) { }

  ngOnInit() {
    this.selectedLocation = SelectedLocation.selectedLocation;
    
    this.updateWarnings();
    
    setInterval(async () => {
      await this.updateWarnings();
    }, 5000);
  }

  updateWarnings(){
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

    if (CurrentUserData.IsAdmin) {
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

    return `${('0'+ date.getDate()).slice(-2)}-${('0'+ (date.getMonth() + 1)).slice(-2)} ${('0'+ date.getHours()).slice(-2)}:${('0'+ date.getMinutes()).slice(-2)}`;
  }
}
