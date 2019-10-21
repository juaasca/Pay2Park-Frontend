import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/Domain/Client';
import { SelectedClient } from '../selected.client';
import { UserActions } from 'src/app/logic/user.actions.service';
import { AlertController } from '@ionic/angular';
import { ManageClientsComponent } from '../manage.clients.component';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss'],
})
export class InfoClientComponent implements OnInit {
  private selectedClient: Client = null;
  private birthDateIsNull: boolean = false;
  private formattedBirthDate: string = '';

  constructor(
    private router: Router,
    private userActions: UserActions,
    private alertController: AlertController,
    private manageClientsComponent: ManageClientsComponent) { }

  ngOnInit() {
    this.selectedClient = SelectedClient.selectedClient;
    this.birthDateIsNull = this.selectedClient.BirthDate === undefined;

    if (!this.birthDateIsNull) {
      var birthDate = new Date(this.selectedClient.BirthDate);
      this.formattedBirthDate = birthDate.toLocaleDateString('es-ES');
    }
  }

  async deleteUserAsync() {
    const alert = await this.alertController.create({
			header: 'Eliminar cliente',
			message: '¿Está seguro que desea eliminar este cliente? Esta acción no podrá deshacerse.',
			buttons: [
				{
					text: 'Cancelar',
					handler: () => {
						alert.dismiss();
					},
				},
				{
					text: 'Confirmar',
					handler: () => {
            this.userActions.deleteClient(this.selectedClient);
            this.manageClientsComponent.updateClients();
            
            this.router.navigateByUrl("main/admin/manage-clients");
					},
				},
			],
		});

		await alert.present();
  }

  showPlates(){
    this.router.navigateByUrl('main/admin/manage-clients/info-client/info-plates');
  }

  showComplaints(){
    this.router.navigateByUrl('main/admin/manage-clients/info-client/info-complaints');
  }
}
