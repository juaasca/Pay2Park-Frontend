import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/Domain/Client';
import { SelectedClient } from '../selected.client';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss'],
})
export class InfoClientComponent implements OnInit {
  private selectedClient: Client = null;
  private birthDateIsNull: boolean = false;
  private formattedBirthDate: string = '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.selectedClient = SelectedClient.selectedClient;
    this.birthDateIsNull = this.selectedClient.BirthDate === undefined;

    if (!this.birthDateIsNull) {
      var birthDate = new Date(this.selectedClient.BirthDate);
      this.formattedBirthDate = birthDate.toLocaleDateString('es-ES');
    }
  }

  showPlates(){
    this.router.navigateByUrl('main/admin/manage-clients/info-client/info-plates');
  }

  showComplaints(){
    this.router.navigateByUrl('main/admin/manage-clients/info-client/info-complaints');
  }
}
