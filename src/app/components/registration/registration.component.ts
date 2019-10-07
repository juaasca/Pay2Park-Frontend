import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import * as firebase from 'firebase';
import { Client } from 'src/app/Domain/Client';
import { ClientsService } from 'src/app/services/dao/clients.service';
import {passwordValidation} from './passwordValidation';
import {usernameValidation} from './usernameValidation';
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
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Username: new FormControl('', Validators.compose([
        Validators.required,
        usernameValidation.validUsername,
        Validators.minLength(8)
      ])),
      RetryPassword: new FormGroup({
         Password: new FormControl ('', Validators.compose([
            Validators.required,
            Validators.minLength(8), 
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
         ])),
         ConfirmPassword: new FormControl('', Validators.required)
      //RetryPassword: this.formBuilder.group({
        //Password: ['', Validators.required, Validators.minLength(8), 
        //        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')],
        //ConfirmPassword: ['', Validators.required, Validators.minLength(8)],
      }, (formGroup: FormGroup) => {
        return passwordValidation.areEqual(formGroup);
      }),
      Birthdate: ['', Validators.required],
      Email: new FormControl ('', Validators.compose([
        Validators.required, 
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      DNI: ['', Validators.required, Validators.minLength(9)],
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

  validation_messages = {
    'Name': [
          {type: 'required', message: 'El nombre es necesario.'}
    ],
    'Surname': [
          {type: 'required', message: 'El apellido es necesario.'}
    ],
    'Username': [
          {type: 'required', message: 'El nombre de usuario es necesario.'},
          {type: 'minLength', message: 'La longitud mínima es de 8 caracteres.'},
          {type: 'validUsername', message: 'El nombre de usuario ya está cogido.'}
    ],
    'RetryPassword': [
      {type: 'required', message: 'La contraseña es necesaria.'},
      {type: 'minLength', message: 'La longitud mínima es de 8 caracteres.'},
      {type: 'pattern', message: 'La contraseña debe contener mínimo una letra minúscula, una letra mayúscula y un número. No puede contener caracteres especiales.'}
    ],
    'Birthdate': [
      {type: 'required', message: 'La fecha de nacimiento es necesario.'}
      
    ],
    'Email': [
      {type: 'required', message: 'El correo electrónico es necesario.'},
      {type: 'pattern', message: 'Correo incorrecto.'}
      
    ],
    'DNI': [
      {type: 'required', message: 'El DNI es necesario.'}
      
    ],
  }
}
