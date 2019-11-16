import { CurrentUserData } from 'src/app/data/current.user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserActions } from 'src/app/logic/user.actions.service';
import { Client } from 'src/app/Domain/Client';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  private cartera: FormGroup;
  email = CurrentUserData.LoggedUser.Email;
  saldo = CurrentUserData.wallet;
  
  constructor(
    private formBuilder: FormBuilder,
    private userActions : UserActions

  ) {
    this.cartera = this.formBuilder.group({
      dinero: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('')
        ]))
      })
   }

  ngOnInit() {}

  anyadirSaldo(){
    var formValue = this.cartera.value;
    console.log(formValue.dinero);
    var nuevoSaldo = Number (formValue.dinero) + Number (CurrentUserData.wallet); // CurrentUserData.wallet.value;
    this.saldo = nuevoSaldo;
    var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, nuevoSaldo);
    CurrentUserData.LoggedUser = user;
    CurrentUserData.wallet = this.saldo;
    this.userActions.updateWallet(user);
  }

  restarSaldo(){
    var formValue = this.cartera.value;
    console.log(formValue.dinero);
    var nuevoSaldo = Number (formValue.dinero) - Number (CurrentUserData.wallet); // CurrentUserData.wallet.value;
    this.saldo = nuevoSaldo;
    var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, nuevoSaldo);
    CurrentUserData.LoggedUser = user;
    CurrentUserData.wallet = this.saldo;
    this.userActions.updateWallet(user);
  }

}