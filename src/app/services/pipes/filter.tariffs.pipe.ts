import { Pipe, PipeTransform } from '@angular/core';
import { Fare } from 'src/app/Domain/Fare';

@Pipe({
  name: 'filterTariff'
})
export class FilterTariffPipe implements PipeTransform {
  transform(tariffs: Fare[], filter: string): any[] {
    if (filter === ''){
        return tariffs;
    }
    return tariffs.filter(tariff=> {
        return (`${tariff.Duration} - ${tariff.IsRealTime} - ${tariff.Price}`).toLowerCase()
            .includes(filter.toLowerCase())
    });
  }
}