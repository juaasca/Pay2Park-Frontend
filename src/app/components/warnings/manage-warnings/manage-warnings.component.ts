import { Component, OnInit } from '@angular/core';
import { Location } from 'src/app/Domain/Location';
import { SelectedLocation } from '../selectedLocation';
import { WarningActionsService } from 'src/app/logic/warning.actions.service';
import { Warning } from 'src/app/Domain/Warning';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-warnings',
  templateUrl: './manage-warnings.component.html',
  styleUrls: ['./manage-warnings.component.scss'],
})
export class ManageWarningsComponent implements OnInit {
  private selectedLocation: Location;
  private warnings: Warning[]=[];
  
  constructor(private router: Router, private warningActionsService: WarningActionsService) { }

  ngOnInit() {
    this.selectedLocation = SelectedLocation.selectedLocation;
    this.updateWarnings();
    
    setInterval(async () => {
      await this.updateWarnings();
    }, 2000);
  }

  updateWarnings(){
    return this.warningActionsService.getWarningsByLocationAsync(this.selectedLocation)
      .then((warnings) => {
        this.warnings = warnings.sort((a, b) => this.sortWarningAscendingByDate(a, b));
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
