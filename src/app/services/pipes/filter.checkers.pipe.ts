import { Pipe, PipeTransform } from '@angular/core';
import { Worker } from 'src/app/Domain/Worker';

@Pipe({
  name: 'filterCheckers'
})
export class FilterCheckersPipe implements PipeTransform {

  transform(checkers: Worker[], filter: string): any[] {
    if (filter === ''){
        return checkers;
    }
    return checkers.filter(checker => {
        return (`${checker.Name} - ${checker.Username}`).toLowerCase()
            .includes(filter.toLowerCase())
    });
  }

}
