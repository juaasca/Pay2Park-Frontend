import { Injectable } from '@angular/core';
import { TariffService } from '../services/dao/tariff.service';
import { Tariff } from '../Domain/Tariff';

@Injectable({
  providedIn: 'root'
})
export class TariffActionsService {
  constructor(private tariffService: TariffService) { }

  registerNewTariffAsync(tariff: Tariff) {
    return this.tariffService.addEntityAsync(tariff.Identifier, tariff);
  }
}
