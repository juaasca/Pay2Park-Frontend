import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserActions } from 'src/app/logic/user.actions.service';
import { AgeValidatorService } from 'src/app/services/validators/age.validator.service';
import { UsernameValidatorService } from 'src/app/services/validators/username.validator.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ExceptionCodes } from 'src/app/resources/exception.codes';
import { ExceptionMessages } from 'src/app/resources/exception.messages';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {
  private registration: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userActions : UserActions,
    private usernameValidator: UsernameValidatorService,
    private alertController: AlertController) {
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
      Password: new FormControl ('', Validators.compose([
         Validators.required,
         Validators.minLength(8), 
         Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      ConfirmPassword: new FormControl('', Validators.compose([
       Validators.required,
       Validators.minLength(8), 
       Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
       this.equalTo('Password')
      ])),
      Birthdate: new FormControl ('', Validators.compose([
        Validators.required,
        AgeValidatorService.overEighteen
      ])),
      Email: new FormControl ('', Validators.compose([
        Validators.required, 
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
    });
  }

	ngOnInit() {}

	async saveData() {
		var formValue = this.registration.value;

		this.userActions
			.registerNewUserAsync(formValue.Name, formValue.Surname, formValue.Username, formValue.Password, formValue.Birthdate, formValue.Email)
			  .then(async () => await this.userSuccesfullyCreatedAlert())
			  .catch(async error => {
				  var message = this.getErrorMessageTranslated(error.code);
          
          await this.errorCreatingUserAlert(message);
			  });
  }

	getErrorMessageTranslated(code: string) {
		switch (code) {
			case ExceptionCodes.emailAlreadyInUse:
				return ExceptionMessages.emailAlreadyInUse;
			case ExceptionCodes.invalidEmail:
				return ExceptionMessages.invalidEmail;
			default:
				return ExceptionMessages.errorCreatingUser;
		}
	}

	back() {
		this.router.navigateByUrl('authentication');
	}

	async userSuccesfullyCreatedAlert() {
		const alert = await this.alertController.create({
			header: '¡Éxito!',
			message:
				'Usuario creado con éxito. Ahora puede autentificarse en la aplicación.',
			buttons: [
				{
					text: 'Aceptar',
					handler: () => {
						this.back();
					},
				},
			],
		});

		await alert.present();
	}

	async errorCreatingUserAlert(error: string) {
		const alert = await this.alertController.create({
			header: '¡Error!',
			message: error,
			buttons: [
				{
					text: 'Cancelar',
					handler: () => {
						this.back();
					},
				},
				{
					text: 'Intentar de nuevo',
					handler: () => {
						alert.dismiss();
					},
				},
			],
		});

		await alert.present();
	}
  validation_messages = {
    'Name': [
          {type: 'required', message: '· El nombre es obligatorio.'},
          {type: 'pattern', message: 'El nombre no puede contener números ni caracteres especiales.'}
    ],
    'Surname': [
      {type: 'required', message: 'El apellido es obligatorio.'},
      {type: 'pattern', message: 'El apellido no puede contener números ni caracteres especiales.'}
    ],
    'Username': [
      {type: 'required', message: '· El nombre de usuario es obligatorio.'},
      {type: 'validUsername', message: '· El nombre de usuario ya está en uso.'}
    ],
    'Password': [
      {type: 'required', message: '· La contraseña es obligatoria.'},
      {type: 'minLength', message: '· La longitud mínima es de 8 caracteres.'},
      {type: 'pattern', message: '· La contraseña debe contener mínimo una letra minúscula, una letra mayúscula y un número. No puede contener caracteres especiales.'}
    ],
    'ConfirmPassword': [
      {type: 'equalTo', message: '· Las contraseñas no coinciden.'},
    ],
    'Birthdate': [
      {type: 'required', message: '· La fecha de nacimiento es obligatoria.'},
      {type: 'ageValidation', message: '· Debes ser mayor de edad'}
    ],
    'Email': [
      {type: 'required', message: '·El correo electrónico es obligatorio.'},
      {type: 'pattern', message: '· Correo incorrecto.'}
    ],
  }


	equalTo(field_name): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			let input = control.value;
			let isValid = control.root.value[field_name] == input;
			if (!isValid) return { equalTo: { isValid } };
			else return null;
		};
	}
}
