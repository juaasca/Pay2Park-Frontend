import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tariff } from 'src/app/Domain/Tariff';
import { TariffService } from 'src/app/services/dao/tariff.service';
import { SelectedTariff } from './selected.tariff';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss'],
})
export class TariffComponent implements OnInit {
  private tariffs: Tariff[] = [];

  constructor(private tariffService: TariffService, private router: Router){}

  ngOnInit() {
    setInterval(() => {
      this.updateTariffs();
    }, 1000);
  }

  create(){
    this.router.navigateByUrl('main/admin/tariff/create-tariff');
  }

  manage(tariff){
    var selectedTariff = <Tariff> tariff;
    SelectedTariff.selectedTariff = selectedTariff;
    this.router.navigateByUrl('main/admin/tariff/view-tariff');
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
