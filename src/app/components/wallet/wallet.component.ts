
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserActions } from 'src/app/logic/user.actions.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  private cartera: FormGroup;

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
    //this.userActions... añadir saldo
  }

}