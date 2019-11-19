import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { PersistenceService } from './persistence.service';
import { Client } from 'src/app/Domain/Client';
import { Transactions } from 'src/app/Domain/Transactions';

@Injectable({
    providedIn: 'root'
})

export class HistoryService extends PersistenceService<Transactions> {
    private refTransactions: firebase.database.Reference;
    private transactionsDataBaseUrl = 'Histories';

    constructor() {
        super();
        this.refTransactions = this.ref.child(this.transactionsDataBaseUrl);
        this.databaseRef = this.refTransactions;
    }

    getRelatedTransactionsAsync(client: Client) {
        var relatedTransactions: Transactions[] = [];
        
        return this.getEntitiesAsync()
          .then((transactions) => {
            transactions.forEach(transaction => {
              if (transaction.OwnersEmail === client.Email) {
                relatedTransactions.push(transaction);
              }
            });
    
            return relatedTransactions;
          });
      }
}