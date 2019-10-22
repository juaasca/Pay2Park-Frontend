import { Component, OnInit } from '@angular/core';
import { SelectedPlate } from '../selectedPlate';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';
import { ParkService } from 'src/app/services/dao/parks.service';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { Park } from 'src/app/Domain/Park';
import { VirtualTimeScheduler } from 'rxjs';
import { Fare } from 'src/app/Domain/Fare';

@Component({
  selector: 'app-check-plate',
  templateUrl: './check-plate.component.html',
  styleUrls: ['./check-plate.component.scss'],
})
export class CheckPlateComponent implements OnInit {
  private vehicle: Vehicle = null;
  private park: Park = null;
  private parkIsNull: boolean = false;
  private isParkedBetweenHours: string = 'No';
  private parkIsValid: boolean = false;
  private leftTime: string = '-'
  constructor(private vehiclesService: VehiclesService, private parksService: ParkService) {}

  async ngOnInit() {
    //await this.receivePlate(SelectedPlate.selectedPlate);
    this.vehicle = new Vehicle("0123ABC", "Opel", "Astra", ["tester@test.es", "test@test.es"]);
    this.park = new Park(1, this.vehicle, "Calle del Flow", [1,2], new Fare(true, "Esto es una prueba", 2, 20));

    this.parkIsNull = this.park === undefined;

    if(!this.parkIsNull) {
      if (this.park.Fare.IsRealTime) {
        console.log(this.park.Date);
        if (this.park.Date === undefined) {
          this.isParkedBetweenHours = 'Sí';
          this.leftTime = 'Tiempo real';
          this.parkIsValid = true;

          return;
        }
      }
      var minutesDifference = this.getMinutesBetweenDates(new Date(Date.now()), new Date(this.park.Date));

      if (minutesDifference > 0) {
        this.isParkedBetweenHours = 'Sí';
        this.parkIsValid = true;
      } else {
        this.isParkedBetweenHours = 'No';
        this.parkIsValid = false;
      }

      this.leftTime = minutesDifference.toFixed(2);      
    }
  }

  getMinutesBetweenDates(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    return (diff / 60000);
}

  async receivePlate(plate: string){
    this.vehicle = await this.findVehicle(plate);
    this.park = await this.findPark(this.vehicle);
  }

  findVehicle(selectedPlate){ 
    return this.vehiclesService.getEntity(selectedPlate);
  }

  findPark(vehicle: Vehicle){
    return this.parksService.getEntitiesAsync()
      .then((parks) => {
        return parks.find(park => park.Vehicle.LicensePlate === vehicle.LicensePlate);
      });
  }
}
