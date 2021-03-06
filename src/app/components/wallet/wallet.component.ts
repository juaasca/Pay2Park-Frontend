import { CurrentUserData } from 'src/app/data/current.user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserActions } from 'src/app/logic/user.actions.service';
import { Client } from 'src/app/Domain/Client';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Transactions } from 'src/app/Domain/Transactions';
import { HistoryService } from 'src/app/services/dao/history.service';

declare var paypal;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss', '../../globalCSS/common.scss'],
})
export class WalletComponent implements OnInit {

  public color: string;
  movements: Transactions[] = [];
  private cartera: FormGroup;
  email = CurrentUserData.LoggedUser.Email;
  saldo = CurrentUserData.wallet;
  saldoIsDefault = true;

  constructor(
    private formBuilder: FormBuilder,
    private historyService: HistoryService,
    private userActions: UserActions,
    private router: Router
  ) {
    this.cartera = this.formBuilder.group({
      dinero: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('')
      ]))
    });
  }

  ngOnInit() {
    this.updateMovements();
    
    this.color = CurrentUserData.color;

    setInterval(async () => {
      this.color = CurrentUserData.color;
      this.saldo = CurrentUserData.wallet;
      await this.updateMovements();
    }, 1000);
  }

  transaccionesUsuario(movements: Transactions[]) {
    if (CurrentUserData.LoggedUser) {
        while (movements.length > 0) {
            let aux = movements.pop();
            if (aux.OwnersEmail[0] == CurrentUserData.LoggedUser.Email) {
                this.movements.push(aux);
            }
        }
    }
}

changeSaldo() {
  this.saldoIsDefault = false;
}

  anyadirSaldo() {
    //Preparar cobro
    var formValue = this.cartera.value;
    var dinero = formValue.dinero;
    var nuevoSaldo = Number(dinero) + Number(CurrentUserData.wallet); // CurrentUserData.wallet.value;
    this.saldo = nuevoSaldo;
    CurrentUserData.price = dinero.toString();
    //Añadir saldo al usuario
    var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, nuevoSaldo, CurrentUserData.FechaFinalizacion, CurrentUserData.EsMultiBono, CurrentUserData.CochesAparcados);
    CurrentUserData.LoggedUser = user;
    CurrentUserData.wallet = this.saldo;
    this.userActions.updateWallet(user);
    //Guardar transaccion en el historial
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    var transaccion = new Transactions(dinero.toString(), dateTime , CurrentUserData.LoggedUser.Email, 'añadido', 'cartera', 'cartera');
    this.userActions.addHistory(user,transaccion);
    CurrentUserData.motivo = "cartera";
    
    //Ir a realizar el pago
    this.router.navigateByUrl('payment');
  }

  updateMovements() {
    return this.historyService.getRelatedTransactionsAsync(<Client>CurrentUserData.LoggedUser, 'cartera')
      .then((transactions) => this.movements = transactions);
  }

  restarSaldo(dinero: Number) {
    var nuevoSaldo = Number(CurrentUserData.wallet) - Number(dinero);// CurrentUserData.wallet.value;
    this.saldo = nuevoSaldo;
    var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, nuevoSaldo, CurrentUserData.FechaFinalizacion, CurrentUserData.EsMultiBono, CurrentUserData.CochesAparcados);
    CurrentUserData.LoggedUser = user;
    CurrentUserData.wallet = this.saldo;
    this.userActions.updateWallet(user);

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    var transaccion = new Transactions(dinero.toString(), dateTime , CurrentUserData.LoggedUser.Email, 'gastado','cartera', 'cartera');
    this.userActions.addHistory(user,transaccion);
  }

}