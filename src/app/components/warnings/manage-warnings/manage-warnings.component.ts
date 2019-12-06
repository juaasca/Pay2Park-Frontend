import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/Domain/Location';
import { Warning } from 'src/app/Domain/Warning';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { SelectedLocation } from '../../common/warnings/selectedLocation';

@Component({
  selector: 'app-manage-warnings',
  templateUrl: './manage-warnings.component.html',
  styleUrls: ['./manage-warnings.component.scss'],
})
export class ManageWarningsComponent implements OnInit {
  private selectedLocation: Location;
  private warnings: Warning[]=[];
  
  constructor(
    private router: Router,
    private locationActionsService: LocationActionsService) { }

  ngOnInit() {
    this.selectedLocation = SelectedLocation.selectedLocation;
    
    if (this.selectedLocation.Warnings === undefined) {
      this.warnings = [];
    } else {
      this.warnings = this.selectedLocation.Warnings;
    }
    
    setInterval(async () => {
      await this.updateWarnings();
    }, 2000);
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

  sortWarningAscendingByDate(firstWarning: Warning, secondWarning: Warning) {
    var warningA = firstWarning.InitalDate;
    var warningB = secondWarning.InitalDate;
    
    if (warningA < warningB) {
      return -1;
    } else if (warningA > warningB) {
      return 1;
    } else {
      return 0;
    }
  }

}
