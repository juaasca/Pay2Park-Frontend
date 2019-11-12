import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { CurrentUserData } from 'src/app/data/current.user';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {

  @ViewChildren('searchBar') input: ElementRef;

  items: string[];
  filterItems: string[];
  color: string;

  constructor(private darkMode: DarkModeService) { }

  ngOnInit() {
    console.log(this.input);
    this.items = ['Alberique‎', 'Bétera‎', 'Burjassot', 'Cullera‎', 'El Puig‎ ', 'Fuenterrobles‎', 'Godella‎', 'Madrid', 'Barcelona', 'Leganes', 'Getafe', 'Tarragona', 'Lerida' ];
    this.items.sort();
    this.filterItems = this.items;

    this.color = CurrentUserData.color;
    setInterval(() => {
      this.color = CurrentUserData.color;
    }, 1000);
  }

  onInput(event) {
    if (event.target.value == '')
      this.filterItems = [...this.items];

    else 
      this.filterItems = this.items.filter(item => item.toLowerCase().includes(event.target.value.toLowerCase()));
  }
}
