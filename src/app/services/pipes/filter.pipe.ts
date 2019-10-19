import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform ( array: any[], text: string, column: string): any[] {
    console.log(text);
    console.log(array);
    if (text === ''){
        return array;
    }
    return array.filter( item => {
        return (`${item.Name} ${item.Surname} - ${item.Username}`).toLowerCase()
            .includes(text.toLowerCase())
    });
  }
}