import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { passwordValidation } from './passwordValidation';
import { UserActions } from 'src/app/logic/user.actions.service';
import { UsernameValidatorService } from 'src/app/services/validators/username.validator.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {
  private registration: FormGroup;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private userActions : UserActions,
    private usernameValidator: UsernameValidatorService) {
    this.registration = this.formBuilder.group({
      Name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[ A-Za-z]+$')
      ])),
      Surname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[ A-Za-z]+$')
      ])),
      Username: new FormControl('', Validators.compose([
        Validators.required,
        UsernameValidatorService.validUsername
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
      DNI: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(9)
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
          {type: 'required', message: 'El nombre es obligatorio.'},
          {type: 'pattern', message: 'El nombre no puede contener números ni caracteres especiales.'}
    ],
    'Surname': [
          {type: 'required', message: 'El apellido es obligatorio.'},
          {type: 'pattern', message: 'El nombre no puede contener números ni caracteres especiales.'}
    ],
    'Username': [
          {type: 'required', message: 'El nombre de usuario es obligatorio.'},
          {type: 'validUsername', message: 'El nombre de usuario ya está en uso.'}
    ],
    'RetryPassword': [
      {type: 'required', message: 'La contraseña es obligatoria.'},
      {type: 'minLength', message: 'La longitud mínima es de 8 caracteres.'},
      {type: 'pattern', message: 'La contraseña debe contener mínimo una letra minúscula, una letra mayúscula y un número. No puede contener caracteres especiales.'}
    ],
    'Birthdate': [
      {type: 'required', message: 'La fecha de nacimiento es obligatoria.'}
      
    ],
    'Email': [
      {type: 'required', message: 'El correo electrónico es obligatorio.'},
      {type: 'pattern', message: 'Correo incorrecto.'}
      
    ],
    'DNI': [
      {type: 'required', message: 'El DNI es obligatorio.'}
      
    ],
  }
}
