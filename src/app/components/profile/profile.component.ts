import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  color:string;
  subcription: Subscription;
  
  constructor(private router: Router, private darkMode: DarkModeService) { }

  ngOnInit() {
    this.subcription = this.darkMode.color.subscribe(color => {
      this.color = color;
    })
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  anadirVehiculo(){
    this.router.navigateByUrl('anadir-vehiculo');
  }
  modoOscuro(){
    if(this.color != "dark"){
    this.darkMode.darkMode();
    }
    else{
      this.darkMode.lightMode();
    }
}
  info(){
    this.router.navigateByUrl('info');
  }
}
