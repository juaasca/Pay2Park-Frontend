import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { CurrentUserData } from 'src/app/data/current.user';
import { Location } from 'src/app/Domain/Location';
import { LocationActionsService } from 'src/app/logic/location.actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss', '../../globalCSS/common.scss'],
})
export class InfoComponent implements OnInit {
  private locations: Location[] = [];
  private searchText = '';
  currentUserIsAdmin = false;

  @ViewChildren('searchBar') input: ElementRef;

  color: string;

  constructor(
    private router: Router,
    private locationActionsService: LocationActionsService) {
    this.updateLocations();
  }

  ngOnInit() {
    this.color = CurrentUserData.color;
    this.currentUserIsAdmin = CurrentUserData.IsAdmin;

    setInterval(async () => {
      this.color = CurrentUserData.color;
      await this.updateLocations();
    }, 2000);
  }

  getItems(event){
    this.searchText = event.detail.value;
  }

  updateLocations() {
    return this.locationActionsService.getLocationsAsync()
      .then((locations) => {
        this.locations = locations.sort((a, b) => this.sortLocationAscendingByName(a, b));
      });
  }

  create() {
    this.router.navigateByUrl('info/add-location');
  }

  delete(location: Location) {
    this.locationActionsService.deleteLocationAsync(location)
      .catch((error) => {});
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
