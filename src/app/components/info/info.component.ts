import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { CurrentUserData } from 'src/app/data/current.user';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit{

  constructor(private darkMode: DarkModeService) { }

  color:string;
  
  ngOnInit(){
    this.color = CurrentUserData.color;
    setInterval(() => {
      this.color = CurrentUserData.color;
  }, 1000);
  }
}
