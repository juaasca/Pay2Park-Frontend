import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  private registration: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.registration = this.formBuilder.group({
      Nombre: ['',Validators.required],
      Apellidos: ['', Validators.required],
      Usuario: ['', Validators.required],
      ContraseñaRetry: this.formBuilder.group({
        Contraseña: ['',Validators.required],
        ConfirmarContraseña: ['', Validators.required],
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
    this.router.navigateByUrl('authentication')
}

}
