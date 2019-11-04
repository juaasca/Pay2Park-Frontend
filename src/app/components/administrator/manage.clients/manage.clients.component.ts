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
  private clients: Client[] = [];
  private searchText = '';
  
  constructor(private clientsService: ClientsService, private router: Router) {
    this.updateClients();
  }

  ngOnInit() {
    setInterval(() => {
      this.updateClients();
    }, 1000);
  }

  updateClients() {
    this.clientsService.getEntitiesAsync().then((clients) => this.clients = clients.sort((a, b) => this.sortNameAscending(a, b)));
  }

  getItems(event){
    this.searchText = event.detail.value;
  }

  click(client){
    var selectedClient = <Client>client;
    SelectedClient.selectedClient = selectedClient;
    this.router.navigateByUrl('main/admin/manage-clients/info-client');
  }

  sortNameAscending(clientA: Client, clientB: Client) {
      var nameA=clientA.Name.toLowerCase(), nameB=clientB.Name.toLowerCase()
      if (nameA < nameB)
          return -1 
      if (nameA > nameB)
          return 1
      return 0
  }
}