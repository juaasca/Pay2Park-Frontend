import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import * as firebase from 'firebase';
import { Client } from 'src/app/Domain/Client';
import { ClientsService } from 'src/app/services/dao/clients.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {
  private registration: FormGroup;

  constructor(private location: Location, private formBuilder: FormBuilder, private clientsService : ClientsService) {
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

    var newClient =
      new Client(formValue.DNI, formValue.Nombre, formValue.Apellidos, formValue.Usuario, formValue.FechaNacimiento, formValue.Email);

    firebase.auth().createUserWithEmailAndPassword(newClient.Mail, formValue.RetryPassword.Password);

    this.clientsService.addClient(newClient);
  }

  volver(){
    this.location.back();
  }
}
