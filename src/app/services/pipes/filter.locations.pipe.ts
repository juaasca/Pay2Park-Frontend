import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../../Domain/Location'

@Pipe({
  name: 'filterLocations'
})
export class FilterLocationsPipe implements PipeTransform {
  transform(locations: Location[], filter: string): any[] {
    if (filter === ''){
        return locations;
    }
    return locations.filter(location=> {
        return (location.Name).toLowerCase().includes(filter.toLowerCase())
    });
  }
}
