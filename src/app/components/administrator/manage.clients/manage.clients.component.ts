import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/dao/clients.service';
import { Client } from 'src/app/Domain/Client';

@Component({
  selector: 'app-manage.clients',
  templateUrl: './manage.clients.component.html',
  styleUrls: ['./manage.clients.component.scss'],
})
export class ManageClientsComponent implements OnInit {
  private users: Client[] = [];
  
  constructor(private clientsService: ClientsService) {
    this.clientsService.getEntitiesAsync().then(clients => this.users = clients);
   }

  ngOnInit() {}

  async showUsersAsync(){
    this.users = await this.clientsService.getEntitiesAsync();
  }

}
