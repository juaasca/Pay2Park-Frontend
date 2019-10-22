import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterClientPipe implements PipeTransform {
  transform(clients: any[], filter: string): any[] {
    if (filter === ''){
        return clients;
    }
    return clients.filter(client => {
        return (`${client.Name} ${client.Surname} - ${client.Username}`).toLowerCase()
            .includes(filter.toLowerCase())
    });
  }
}