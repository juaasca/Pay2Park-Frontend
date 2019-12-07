import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';
import { ParkService } from 'src/app/services/dao/parks.service';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { Park } from 'src/app/Domain/Park';
import { Tariff } from 'src/app/Domain/Tariff';
import { VehicleActionsService } from 'src/app/logic/vehicle.actions.service';
import { SelectedPlate } from '../selectedPlate';

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
  constructor(private vehicleActionsService: VehicleActionsService, private parksService: ParkService) {
    this.vehicle = new Vehicle('', '', '', '');
  }

  async ngOnInit() {
    this.vehicleActionsService.getVehicleByPlate(SelectedPlate.selectedPlate)
      .then((vehicle) => this.vehicle = vehicle);

    this.park = new Park(1, this.vehicle, "Calle del Flow", [1,2], new Tariff(true, "Esto es una prueba", 2, 20),(new Date()).toString());

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
}
