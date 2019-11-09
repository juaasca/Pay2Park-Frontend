import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit, OnDestroy {

  constructor(private darkMode: DarkModeService) { }

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
  ngOnInit(){
    this.suscription = this.darkMode.color.subscribe(color => {
      this.color = color;
    });
  }
  color:string;
  suscription: Subscription;
}
