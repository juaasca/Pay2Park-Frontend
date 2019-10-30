import { Pipe, PipeTransform } from '@angular/core';
import { Client } from 'src/app/Domain/Client';

@Pipe({
  name: 'filterClient'
})
export class FilterClientPipe implements PipeTransform {
  transform(clients: Client[], filter: string): any[] {
    if (filter === ''){
        return clients;
    }
    return clients.filter(client => {
        return (`${client.Name} - ${client.Username}`).toLowerCase()
            .includes(filter.toLowerCase())
    });
  }
}