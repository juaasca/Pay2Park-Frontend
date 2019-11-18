import { CurrentUserData } from 'src/app/data/current.user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserActions } from 'src/app/logic/user.actions.service';
import { Client } from 'src/app/Domain/Client';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { disableDebugTools } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Transactions } from 'src/app/Domain/Transactions';

declare var paypal;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  public color: string;
  private cartera: FormGroup;
  email = CurrentUserData.LoggedUser.Email;
  saldo = CurrentUserData.wallet;

  constructor(
    private formBuilder: FormBuilder,
    private userActions: UserActions,
    private router: Router
  ) {
    this.cartera = this.formBuilder.group({
      dinero: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('')
      ]))
    })
  }

  ngOnInit() {
    this.color = CurrentUserData.color;
    setInterval(() => {
      this.color = CurrentUserData.color;
    }, 1000);
  }

  anyadirSaldo() {
    var formValue = this.cartera.value;
    console.log(formValue.dinero);
    var nuevoSaldo = Number(formValue.dinero) + Number(CurrentUserData.wallet); // CurrentUserData.wallet.value;
    this.saldo = nuevoSaldo;
    var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, nuevoSaldo);
    CurrentUserData.LoggedUser = user;
    CurrentUserData.wallet = this.saldo;
    var aaa = new Transactions('a', 'a', 'a');
    this.userActions.addHistory(user,aaa);
    this.userActions.updateWallet(user);
    CurrentUserData.price = formValue.dinero.toString();
    this.router.navigateByUrl('payment');


    /*let _this = this;
    setTimeout(() => {
      // Render the PayPal button into #paypal-button-container
      paypal.Buttons({

        // Set up the transaction
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: formValue.dinero
              }
            }]
          });
        },

        // Finalize the transaction
        onApprove: function (data, actions) {
          return actions.order.capture()
            .then(function (details) {
              // Show a success message to the buyer
              alert('Transaction completed by ' + details.payer.name.given_name + '!');
            })
            .catch(err => {
              console.log(err);
            })
        }
      }).render('#paypal-button-container');
    }, 500) */
  }

  restarSaldo() {
    var formValue = this.cartera.value;
    console.log(formValue.dinero);
    var nuevoSaldo = Number(formValue.dinero) - Number(CurrentUserData.wallet); // CurrentUserData.wallet.value;
    this.saldo = nuevoSaldo;
    var user = new Client(CurrentUserData.LoggedUser.Name, CurrentUserData.LoggedUser.Username, CurrentUserData.LoggedUser.BirthDate, CurrentUserData.LoggedUser.Email, nuevoSaldo);
    CurrentUserData.LoggedUser = user;
    CurrentUserData.wallet = this.saldo;
    this.userActions.updateWallet(user);
  }

}