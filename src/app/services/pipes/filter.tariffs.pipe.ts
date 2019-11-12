import { Pipe, PipeTransform } from '@angular/core';
import { Tariff } from 'src/app/Domain/Tariff';

@Pipe({
  name: 'filterTariff'
})
export class FilterTariffPipe implements PipeTransform {
  transform(tariffs: Tariff[], filter: string): any[] {
    if (filter === ''){
        return tariffs;
    }
    return tariffs.filter(tariff=> {
        return (`${tariff.Duration} - ${tariff.IsRealTime} - ${tariff.Price}`).toLowerCase()
            .includes(filter.toLowerCase())
    });
  }
}