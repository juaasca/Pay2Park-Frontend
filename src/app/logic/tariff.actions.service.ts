import { Injectable } from '@angular/core';
import { TariffService } from '../services/dao/tariff.service';
import { Tariff } from '../Domain/Tariff';

@Injectable({
  providedIn: 'root'
})
export class TariffActionsService {
  constructor(private tariffService: TariffService) { }

  registerNewTariffAsync(tariff: Tariff) {
<<<<<<< HEAD
    return this.tariffService.addEntityAsync(undefined, tariff);
=======
    return this.tariffService.addEntityAsync(tariff.Identifier, tariff);
>>>>>>> c1103b03ac55d1162c16268e3fbfa2f5ed7e5d71
  }
}
