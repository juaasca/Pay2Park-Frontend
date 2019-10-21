import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/dao/clients.service';
import { Client } from 'src/app/Domain/Client';
import { Router } from '@angular/router';
import { SelectedClient } from './selected.client';

@Component({
  selector: 'app-manage.clients',
  templateUrl: './manage.clients.component.html',
  styleUrls: ['./manage.clients.component.scss'],
})
export class ManageClientsComponent implements OnInit {
  private users: Client[] = [];
  private searchText = '';
  
  constructor(private clientsService: ClientsService, private router: Router) {
    this.clientsService.getEntitiesAsync().then(clients => this.users = clients);
  }

  updateClients() {
    this.clientsService.getEntitiesAsync().then(clients => this.users = clients);
  }

  ngOnInit() {}

  async showUsersAsync(){
    this.users = await this.clientsService.getEntitiesAsync();
  }

  getItems(event){
    this.searchText = event.detail.value;
  }

  click(client){
    var selectedClient = <Client>client;
    SelectedClient.selectedClient = selectedClient;
    this.router.navigateByUrl('main/admin/manage-clients/info-client');
  }
}