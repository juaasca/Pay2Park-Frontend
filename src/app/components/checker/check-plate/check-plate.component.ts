import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';
import { ParkService } from 'src/app/services/dao/parks.service';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { Park } from 'src/app/Domain/Park';
import { Tariff } from 'src/app/Domain/Tariff';
import { SelectedPlate } from '../selectedPlate';
import { FormBuilder, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-plate',
  templateUrl: './check-plate.component.html',
  styleUrls: ['./check-plate.component.scss'],
})
export class CheckPlateComponent implements OnInit {
  public vehicle: Vehicle;
  private park: Park = null;
  private parkIsNull: boolean = false;
  private isParkedBetweenHours: string = 'No';
  private parkIsValid: boolean = true;
  private leftTime: string = '-';
  private createplate: FormGroup;
  vehicleActionsService: any;
  constructor(private vehiclesService: VehiclesService, private parksService: ParkService, protected formBuilderPlate: FormBuilder ) { }


  async ngOnInit() {
    this.vehicle = await this.vehicleActionsService.getVehicleByPlate(SelectedPlate.selectedPlate);
    this.vehicle = new Vehicle("", "", "", "");
    this.park = new Park(1, this.vehicle, "Calle del Flow", [1, 2], new Tariff(true, "Esto es una prueba", 2, 20), (new Date()).toString());

    this.parkIsNull = this.park === undefined;

    if (!this.parkIsNull) {
      if (this.park.Fare.IsRealTime) {
        console.log(this.park.Date);
        if (this.park.Date === undefined) {
          this.isParkedBetweenHours = 'Sí';
          this.leftTime = 'Tiempo real';
          this.parkIsValid = true;

          return;
        }
      }

    }
  }

  getMinutesBetweenDates(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    return (diff / 60000);
  }

  async receivePlate(plate: string) {
    this.vehicle = await this.findVehicle(plate);
    this.park = await this.findPark(this.vehicle.LicensePlate);
  }

  findVehicle(selectedPlate) {
    return this.vehiclesService.getEntityAsync(selectedPlate);
  }
  
  checkPlate(){
    this.findVehicle(this.vehicle.LicensePlate).then((vehicle) => {
      console.log(vehicle);
      this.vehicle = vehicle;
    });

    let park = this.findPark(this.vehicle.LicensePlate).then((park) => {
      if(park){
        this.park = park;

        console.log(this.park);

        var minutesDifference = this.getMinutesBetweenDates(new Date(Date.now()), new Date(this.park.Date));

        if (minutesDifference > 0) {
          this.isParkedBetweenHours = 'Sí';
          this.parkIsValid = true;
        } else {
          this.isParkedBetweenHours = 'No';
          this.parkIsValid = false;
        }

        let beautifiedLeftTime = (minutesDifference).toFixed(0) + " minutos";
  
        this.leftTime = beautifiedLeftTime;
      }
    });
  }

  findPark(licensePlate: String) {
    return this.parksService.getEntitiesAsync()
      .then((parks) => {
        return parks.find(park => park.Vehicle.LicensePlate === licensePlate);
      });
  }
}
