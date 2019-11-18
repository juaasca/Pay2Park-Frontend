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
  private locations: Location[] = [];

  @ViewChildren('searchBar') input: ElementRef;

  items: string[];
  filterItems: string[];
  color: string;

  constructor(private locationService: LocationService, private darkMode: DarkModeService) {
    this.updateLocations();
  }

  ngOnInit() {
    console.log(this.input);
    this.items = ['Valencia','Alberique‎', 'Bétera‎', 'Burjassot', 'Cullera‎', 'El Puig‎ ', 'Fuenterrobles‎', 'Godella‎', 'Madrid', 'Barcelona', 'Leganes', 'Getafe', 'Tarragona', 'Lerida' ];
    this.items.sort();
    this.filterItems = this.items;

    this.color = CurrentUserData.color;
    setInterval(() => {
      this.color = CurrentUserData.color;
      this.updateLocations();
    }, 1000);
  }

  updateLocations() {
    this.locationService.getEntitiesAsync().then((locations) => this.locations = locations.sort((a, b) => this.sortLocationAscending(a, b)));
  }

  onInput(event) {
    if (event.target.value == '')
      this.filterItems = [...this.items];

    else 
      this.filterItems = this.items.filter(item => item.toLowerCase().includes(event.target.value.toLowerCase()));
  }

  sortLocationAscending(locationA: Location, locationB: Location) {
    var nameA=locationA.Name.toLowerCase(), nameB=locationB.Name.toLowerCase()
    if (nameA < nameB)
        return -1 
    if (nameA > nameB)
        return 1
    return 0
}
}
