import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { Subscription } from 'rxjs';
import { CurrentUserData } from 'src/app/data/current.user';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  color:string;
  
  constructor(private loadingController: LoadingController, private router: Router, private darkMode: DarkModeService) { }

  ngOnInit() {
    this.color = CurrentUserData.color;
    setInterval(() => {
      this.color = CurrentUserData.color;
  }, 100);
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
