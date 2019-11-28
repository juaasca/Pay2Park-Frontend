import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/dao/history.service';
import { UserActions } from 'src/app/logic/user.actions.service';
import { Router } from '@angular/router';
import { Client } from 'src/app/Domain/Client';
import { CurrentUserData } from 'src/app/data/current.user';
import { Transactions } from 'src/app/Domain/Transactions';

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.scss'],
})
export class HistorialPagosComponent implements OnInit {

  movements: Transactions[] = [];
  public color: string;

  constructor(private historyService: HistoryService,
    private userActions: UserActions,
    private router: Router) { }

  ngOnInit() {
    this.updateMovements();
    
    this.color = CurrentUserData.color;

    setInterval(async () => {
      this.color = CurrentUserData.color;
      await this.updateMovements();
    }, 1000);
  }

  updateMovements() {
    return this.historyService.getRelatedTransactionsAsync(<Client>CurrentUserData.LoggedUser, 'nocartera')
      .then((transactions) => this.movements = transactions);
  }

}
