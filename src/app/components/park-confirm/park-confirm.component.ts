import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { CurrentUserData } from 'src/app/data/current.user';
import { CurrentParkingData } from 'src/app/data/currentParking';
import { Fare } from 'src/app/Domain/Fare';
import { Park } from 'src/app/Domain/Park';
import { Router } from '@angular/router';


@Component({
  selector: 'app-park-confirm',
  templateUrl: './park-confirm.component.html',
  styleUrls: ['./park-confirm.component.scss'],
})
export class ParkConfirmComponent implements OnInit {
  [x: string]: any;
  vehicles: Vehicle[];
  constructor(private router: Router) { }

  ngOnInit() {
    this.vehicles = [
      new Vehicle('123', 'cocheRojo', 'esRojo', [CurrentUserData.LoggedUser.Email] )
    ];
  }

  aparcarVehiculo(vehiculo: Vehicle){
    CurrentParkingData.park = new Park(1, vehiculo, "Calle Valencia", [1,1], null);
    this.router.navigateByUrl('main/notification');
  }

}
