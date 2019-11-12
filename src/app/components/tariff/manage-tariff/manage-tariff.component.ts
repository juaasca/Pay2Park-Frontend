import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TariffService } from 'src/app/services/dao/tariff.service';
import { Tariff } from 'src/app/Domain/Tariff';

@Component({
  selector: 'app-manage-tariff',
  templateUrl: './manage-tariff.component.html',
  styleUrls: ['./manage-tariff.component.scss'],
})
export class ManageTariffComponent implements OnInit {
  private tariffs: Tariff[] = [];
  private tariff: Tariff = null;

  constructor(private tariffService: TariffService, private router: Router) { 
    /* this.updateTariffs(); */
  }

  ngOnInit() {
    this.tariff = new Tariff(false, "PRUEBA", 20, 120);
    this.tariffs[0] = this.tariff;
  }

  updateTariffs(){
    this.tariffService.getEntitiesAsync().then((tariffs) => this.tariffs = tariffs.sort((a, b) => this.sortNameAscending(a, b)));
  }

  sortNameAscending(tariffA: Tariff, tariffB: Tariff) {
    var nameA=tariffA.Price, nameB=tariffB.Price
    if (nameA < nameB)
        return -1 
    if (nameA > nameB)
        return 1
    return 0
  }
}
