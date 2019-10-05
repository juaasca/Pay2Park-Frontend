import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserActions } from 'src/app/logic/user.actions.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {
  private registration: FormGroup;

  constructor(private location: Location, private formBuilder: FormBuilder, private userActions : UserActions) {
    this.registration = this.formBuilder.group({
      Nombre: ['',Validators.required],
      Apellidos: ['', Validators.required],
      Usuario: ['', Validators.required],
      RetryPassword: this.formBuilder.group({
        Password: ['',Validators.required],
        ConfirmPassword: ['', Validators.required],
      }),
      FechaNacimiento: ['', Validators.required],
      Email: ['', Validators.required],
      DNI: ['', Validators.required],
    });
  }

  ngOnInit() {}

  saveData(){
    var formValue = this.registration.value;

    this.userActions.registerNewUser(
      formValue.DNI, formValue.Nombre, formValue.Apellidos, formValue.Usuario, formValue.RetryPassword.Password, formValue.FechaNacimiento, formValue.Email);
  }

  volver(){
    this.location.back();
  }
}
