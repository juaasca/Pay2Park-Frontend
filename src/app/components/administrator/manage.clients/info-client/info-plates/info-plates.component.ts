import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { Client } from 'src/app/Domain/Client';
import { SelectedClient } from '../../selected.client';
import { VehicleActionsService } from 'src/app/logic/vehicle.actions.service';

@Component({
  selector: 'app-info-plates',
  templateUrl: './info-plates.component.html',
  styleUrls: ['./info-plates.component.scss'],
})
export class InfoPlatesComponent implements OnInit {
  private SelectedClient: Client = null;
  private RelatedVehicles: Vehicle[] = [];

  constructor(private vehicleActionsService: VehicleActionsService) { }

  ngOnInit() {
    this.SelectedClient = SelectedClient.selectedClient;
    
    this.updateVehicles();

    setInterval(() => this.updateVehicles(), 1000);
  }

  updateVehicles() {
    this.vehicleActionsService.getVehiclesByOwner(this.SelectedClient.Email)
      .then((vehiclesByOwner) => this.RelatedVehicles = vehiclesByOwner);
  }
}
