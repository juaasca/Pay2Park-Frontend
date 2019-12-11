import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { Park } from 'src/app/Domain/Park';
import { Tariff } from 'src/app/Domain/Tariff';
import { SelectedPlate } from '../selectedPlate';
import { VehicleActionsService } from 'src/app/logic/vehicle.actions.service';
import { ParkActionsServiceService } from 'src/app/logic/park.actions.service.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';
import { ParkService } from 'src/app/services/dao/parks.service';

@Component({
  selector: 'app-check-plate',
  templateUrl: './check-plate.component.html',
  styleUrls: ['./check-plate.component.scss'],
})
export class CheckPlateComponent implements OnInit {
  private vehicle: Vehicle = new Vehicle('', '', '', '');
  private park: Park = null;
  private parkIsNull: boolean = false;
  private isParkedBetweenHours: string = 'No';
  private parkIsValid: boolean = true;
  private leftTime: string = '-';
  
  constructor(
    private parksService: ParkService,
    private vehiclesService: VehiclesService,
    private vehicleActionsService: VehicleActionsService,
    private parkActionsService: ParkActionsServiceService,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {}

  async ionViewDidEnter() {
    var relatedVehicle = await this.vehicleActionsService.getVehicleByPlate(SelectedPlate.selectedPlate);

    if (relatedVehicle === null) {
      await this.showVehicleNotFoundAlert();
      
      return;
    }

    this.vehicle = relatedVehicle;

    var parks = await this.parkActionsService.getParksByLicensePlateAsync(SelectedPlate.selectedPlate);
    parks = parks.sort((a, b) => this.sortParksByDate(a, b));

    this.park = parks.shift();

    this.parkIsNull = this.park === undefined;

    if (this.parkIsNull) {
      this.isParkedBetweenHours = 'No';
      this.parkIsValid = false;

      return;
    }

    if (this.park.Fare.IsRealTime) {
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

    this.leftTime = minutesDifference.toFixed(0);
  }

  ionViewDidLeave() {
    this.vehicle = new Vehicle('', '', '', '');
  }

  async showVehicleNotFoundAlert() {
    const alert = await this.alertController.create({
      header: '¡Error!',
      message: `No existe ningún vehículo registrado con la matrícula ${SelectedPlate.selectedPlate}`,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.router.navigateByUrl('main/checker/plate-check-options');
          },
        },
      ],
  });

    await alert.present();
  }

  getMinutesBetweenDates(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    return (diff / 60000);
  }

  sortParksByDate(parkA: Park, parkB: Park) {
    var firstParkInitialDate = parkA.Date;
    var secondParkInitialDate = parkB.Date;

    if (firstParkInitialDate > secondParkInitialDate) {
      return -1;
    } else if (firstParkInitialDate < secondParkInitialDate) {
      return 1;
    } else {
      return 0;
    }
  }

  acceptButtonClicked() {
    this.router.navigateByUrl('main/checker/plate-check-options');
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
