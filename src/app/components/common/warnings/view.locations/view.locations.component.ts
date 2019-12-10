import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '../../../../Domain/Location';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { SelectedLocation } from '../selectedLocation';
import { CurrentUserData } from 'src/app/data/current.user';

export abstract class ViewLocationsComponent implements OnInit {
  protected locations: Location[] = [];
  private searchText = '';
  color: string;
  protected isAdministrator = false;
  protected viewWarningsByLocationRoute: string;

  constructor(
    protected router: Router,
    protected locationActionsService: LocationActionsService) {
    this.updateLocations();
    this.color = CurrentUserData.color;

    setInterval(() => {
      this.color = CurrentUserData.color;
    }, 1000);
  }

  ngOnInit() {
    setInterval(async () => {
      await this.updateLocations();
    }, 2000);
  }

  getItems(event) {
    this.searchText = event.detail.value;
  }

  updateLocations() {
    return this.locationActionsService.getLocationsAsync()
      .then((locations) => {
        this.locations = locations.sort((a, b) => this.sortLocationAscendingByName(a, b));
      });
  }

  locationWarnings(location: Location) {
    var selectedLocation = <Location>location;
    SelectedLocation.selectedLocation = selectedLocation;

    this.router.navigateByUrl(this.viewWarningsByLocationRoute);
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
