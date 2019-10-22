import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { Client } from 'src/app/Domain/Client';
import { SelectedClient } from '../../selected.client';

@Component({
  selector: 'app-info-plates',
  templateUrl: './info-plates.component.html',
  styleUrls: ['./info-plates.component.scss'],
})
export class InfoPlatesComponent implements OnInit {
  private SelectedClient: Client = null;
  private RelatedVehicles: Vehicle[] = [];

  constructor(private vehiclesService: VehiclesService) { }

  ngOnInit() {
    this.SelectedClient = SelectedClient.selectedClient;
    // TODO: Remove the comment below and remove the different fake vehicles.
    //this.vehiclesService.getRelatedVehiclesAsync(this.SelectedClient)
    //  .then((vehicles) => this.RelatedVehicles = vehicles);
    var vehicle1 = new Vehicle("1234ABC", "Opel", "Corsa", ["carlos_casasimarro@yahoo.es"]);
    var vehicle2 = new Vehicle("2345BCD", "Audi", "A5", ["jacamia1@yahoo.es"]);
    var vehicle3 = new Vehicle("8362FZR", "BMW", "Serie 4", ["jacamia1@yahoo.es"]);
    var vehicle4 = new Vehicle("9253HWR", "Hyundai", "I20", ["kodicj@yahoo.es"]);
    var vehicle5 = new Vehicle("9162JKK", "Ford", "Focus", ["jacamia1@yahoo.es"]);
    var vehicle6 = new Vehicle("9354LBC", "Seat", "León", ["jacamia1@yahoo.es"]);
    var vehicle7 = new Vehicle("1624DPR", "Volkswagen", "Golf", ["jacamia1@yahoo.es"]);
    var vehicle8 = new Vehicle("1729GTS", "Seat", "Panda", ["jacamia1@yahoo.es"]);
    var vehicle9 = new Vehicle("8254LBB", "BMW", "Serie 3", ["jacamia1@yahoo.es"]);

    var possibleVehicles = [vehicle1, vehicle2, vehicle3, vehicle4, vehicle5, vehicle6, vehicle7, vehicle8, vehicle9];

    var randomNumberCount = Math.floor(Math.random() * 3);

    for(let i = 0; i < randomNumberCount; i++) {
      var position = Math.floor(Math.random() * possibleVehicles.length);
      this.RelatedVehicles.push(possibleVehicles[position]);
      possibleVehicles.splice(position, 1);
    }
  }  
}
