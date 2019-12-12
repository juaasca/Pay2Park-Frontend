import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { Park } from 'src/app/Domain/Park';
import { SelectedPlate } from '../selectedPlate';
import { VehicleActionsService } from 'src/app/logic/vehicle.actions.service';
import { ParkActionsServiceService } from 'src/app/logic/park.actions.service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';
import { ParkService } from 'src/app/services/dao/parks.service';

@Component({
  selector: 'app-check-plate',
  templateUrl: './check-plate.component.html',
  styleUrls: ['./check-plate.component.scss', '../../../globalCSS/common.scss'],
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
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {}

  async ionViewDidEnter() {
    var relatedVehicle = await this.vehicleActionsService.getVehicleByPlate(SelectedPlate.selectedPlate);

    if (relatedVehicle === null) {
      await this.showVehicleNotFoundAlert();
      
      return;
    }

    this.vehicle = relatedVehicle;

    if (!this.vehicle.Parked) {
      this.isParkedBetweenHours = "No";
      this.parkIsValid = false;
      this.leftTime = '-';

      return;
    }

    this.park = await this.parkActionsService.getParkByLicensePlateAsync(SelectedPlate.selectedPlate);

    if (this.park.Fare.IsRealTime) {
      this.isParkedBetweenHours = 'Sí';
      this.parkIsValid = true;
      this.leftTime = 'Tiempo real';

      return;
    }

    var minutesDifference = this.getMinutesBetweenDates(new Date(Date.now()), new Date(this.park.FinalDate));
  
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
    var firstParkInitialDate = parkA.InitialDate;
    var secondParkInitialDate = parkB.InitialDate;

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

  reportButtonClicked() {
    this.showUserSuccesfullyReportedAsync();
  }

  async showUserSuccesfullyReportedAsync() {
    const toast = await this.toastController.create({
      message: 'Usuario denunciado con éxito.',
      position: 'bottom',
      buttons: [
        {
          side: 'end',
          icon: 'checkmark-circle',
          text: 'Aceptar',
          handler: () => {
            this.router.navigateByUrl('main/checker/plate-check-options');
          }
        }
      ]
    });
    
    toast.present();
  }

  findVehicle(selectedPlate) {
    return this.vehiclesService.getEntityAsync(selectedPlate);
  }
}
