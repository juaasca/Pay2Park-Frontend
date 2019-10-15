import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsernameValidatorService } from 'src/app/services/validators/username.validator.service';
import { UserActions } from 'src/app/logic/user.actions.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})

export class ForgotComponent implements OnInit {
  private forgot: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userActions : UserActions) { 
    this.forgot = this.formBuilder.group({
      Email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ]))
      })
    }

  ngOnInit() {}

  recover() {
    var formValue = this.forgot.value;

    this.userActions.recoverPassword(formValue.Email);

    this.router.navigateByUrl('authentication');

  }

  back(){
    this.router.navigateByUrl('authentication');
  }

  validation_messages = {
    'Email' : [
      {type:'required', message: 'El correo electrónico es obligatorio.'},
      {type: 'pattern', message: 'Introduce una dirección de correo valida'}
    ]
  }

}
