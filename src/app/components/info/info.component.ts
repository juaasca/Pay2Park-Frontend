import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { CurrentUserData } from 'src/app/data/current.user';
import { LocationService } from 'src/app/services/dao/location.service';
import { Location } from 'src/app/Domain/Location';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  private locations: Location[];

  @ViewChildren('searchBar') input: ElementRef;

  filteredLocations: Location[];
  color: string;

  constructor(private locationService: LocationService, private darkMode: DarkModeService) {
    this.updateLocations().then(() => this.filteredLocations = this.locations);
  }

  ngOnInit() {
    this.filteredLocations = this.locations;
    this.color = CurrentUserData.color;

    setInterval(() => {
      this.color = CurrentUserData.color;
      this.updateLocations();
    }, 1000);
  }

  updateLocations() {
    return this.locationService.getEntitiesAsync()
      .then((locations) => {
        this.locations = locations.sort((a, b) => this.sortLocationAscendingByName(a, b));
      });
  }

  onInput(event) {
    if (event.target.value == '')
      this.filteredLocations = this.locations;

    else 
      this.filteredLocations = this.locations.filter(location => location.Name.toLowerCase().includes(event.target.value.toLowerCase()));
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
