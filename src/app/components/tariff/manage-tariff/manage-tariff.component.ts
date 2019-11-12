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

  constructor(private tariffService: TariffService,private router: Router) { 
    this.updateTariffs();
  }

  ngOnInit() {}

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
