import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { Location } from 'src/app/Domain/Location';

@Component({
  selector: 'app-create-warning',
  templateUrl: './create-warning.component.html',
  styleUrls: ['./create-warning.component.scss'],
})
export class CreateWarningComponent implements OnInit {
  private locations: Location[] = [];

  constructor(private router: Router, private locationActionsService: LocationActionsService) {
    this.updateLocations();
   }

  ngOnInit() {}

  updateLocations(){
    return this.locationActionsService.getLocationsAsync()
      .then((locations) => {
        this.locations = locations.sort((a, b) => this.sortLocationAscendingByName(a, b));
      });
  }

  sortLocationAscendingByName(firstLocation: Location, secondLocation: Location) {
    var nameA = firstLocation.Name.toLowerCase();
    var nameB = secondLocation.Name.toLowerCase();
    
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  }
}
