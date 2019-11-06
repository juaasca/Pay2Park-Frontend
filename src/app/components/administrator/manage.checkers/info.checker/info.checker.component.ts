import { Component, OnInit } from '@angular/core';
import { ManageClientsComponent } from '../../manage.clients/manage.clients.component';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WorkerActionsService } from 'src/app/logic/worker.actions.service';
import { Worker } from 'src/app/Domain/Worker';
import { SelectedChecker } from '../selected.checker';

@Component({
  selector: 'app-info.checker',
  templateUrl: './info.checker.component.html',
  styleUrls: ['./info.checker.component.scss'],
})
export class InfoCheckerComponent implements OnInit {
  private selectedChecker: Worker = null;
  private birthDateIsNull: boolean = false;
  private formattedBirthDate: string = '';

  constructor(
    private router: Router,
    private workerActions: WorkerActionsService,
    private alertController: AlertController,
    private manageWorkersComponent: ManageClientsComponent) { }

  ngOnInit() {
    this.selectedChecker = SelectedChecker.selectedChecker;
    this.birthDateIsNull = this.selectedChecker.BirthDate === undefined;

    if (!this.birthDateIsNull) {
      var birthDate = new Date(this.selectedChecker.BirthDate);
      this.formattedBirthDate = birthDate.toLocaleDateString('es-ES');
    }
  }

  async deleteCheckerAsync() {
    const alert = await this.alertController.create({
			header: 'Eliminar revisor',
			message: '¿Está seguro que desea eliminar este revisor? Esta acción no podrá deshacerse.',
			buttons: [
				{
					text: 'Cancelar',
					handler: () => {
						alert.dismiss();
					},
				},
				{
					text: 'Confirmar',
					handler: async () => {
            await this.workerActions.deleteWorkerAsync(this.selectedChecker);
            
            this.router.navigateByUrl("main/admin/manage-checkers");
					},
				},
			],
		});

		await alert.present();
  }
}