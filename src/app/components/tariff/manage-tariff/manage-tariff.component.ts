import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TariffService } from 'src/app/services/dao/tariff.service';
import { Fare } from 'src/app/Domain/Fare';

@Component({
  selector: 'app-manage-tariff',
  templateUrl: './manage-tariff.component.html',
  styleUrls: ['./manage-tariff.component.scss'],
})
export class ManageTariffComponent implements OnInit {
  private tariffs: Fare[] = [];

  constructor(private tariffService: TariffService,private router: Router) { 
    this.updateTariffs();
  }

  ngOnInit() {}

  updateTariffs(){
    this.tariffService.getEntitiesAsync().then((tariffs) => this.tariffs = tariffs.sort((a, b) => this.sortNameAscending(a, b)));
  }

  sortNameAscending(tariffA: Fare, tariffB: Fare) {
    var nameA=tariffA.Price, nameB=tariffB.Price
    if (nameA < nameB)
        return -1 
    if (nameA > nameB)
        return 1
    return 0
  }
}
