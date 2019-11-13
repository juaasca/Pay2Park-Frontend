import { OnInit } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsernameValidatorService } from 'src/app/services/validators/username.validator.service';
import { AgeValidatorService } from 'src/app/services/validators/age.validator.service';
import { ExceptionCodes } from 'src/app/resources/exception.codes';
import { ExceptionMessages } from 'src/app/resources/exception.messages';

export abstract class CreatePersonComponent<T> implements OnInit {
  protected creatingPersonForm: FormGroup;
  protected backRoute: string;
  protected componentTitle: string;
  protected buttonTitle: string;
  
  constructor(
    protected formBuilder: FormBuilder,
    protected alertController: AlertController,
    protected router: Router
  ) {
    this.creatingPersonForm = this.formBuilder.group({
        Name: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[ A-Za-z]+$'),
        ])),
        Surname: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[ A-Za-z]+$'),
        ])),
        Username: new FormControl('', Validators.compose([
            Validators.required,
            UsernameValidatorService.validUsername,
        ])),
        Password: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        ])),
        ConfirmPassword: new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
            this.equalTo('Password'),
        ])),
        Birthdate: new FormControl('', Validators.compose([
            Validators.required,
            AgeValidatorService.overEighteen,
        ])),
        Email: new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
          ])),
      });
  }

  ngOnInit() {
  }

  abstract saveData(): void;

  back() {
    this.router.navigateByUrl(this.backRoute)
  }

  async userSuccesfullyCreatedAlert() {
    const alert = await this.alertController.create({
        header: '¡Éxito!',
        message:
            'Cuenta creada con éxito.',
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
  
  equalTo(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let input = control.value;
        let isValid = control.root.value[field_name] == input;
        if (!isValid) return { equalTo: { isValid } };
        else return null;
    };
  }

  protected validation_messages = {
      Name: [
          { type: 'required', message: '· El nombre es obligatorio.' },
          { type: 'pattern', message: 'El nombre no puede contener números ni caracteres especiales.', },
        ],
        Surname: [
            { type: 'required', message: 'El apellido es obligatorio.' },
            { type: 'pattern', message: 'El apellido no puede contener números ni caracteres especiales.', },
        ],
        Username: [
            { type: 'required', message: '· El nombre de usuario es obligatorio.', },
            { type: 'validUsername', message: '· El nombre de usuario ya está en uso.', },
        ],
        Password: [
            { type: 'required', message: '· La contraseña es obligatoria.' },
            { type: 'minlength', message: '· La longitud mínima es de 8 caracteres.', },
            { type: 'pattern', message: '· La contraseña debe contener mínimo una letra minúscula, una letra mayúscula y un número. No puede contener caracteres especiales.', },
        ],
        ConfirmPassword: [
            { type: 'equalTo', message: '· Las contraseñas no coinciden.' },
        ],
        Birthdate: [
            { type: 'required', message: '· La fecha de nacimiento es obligatoria.', },
            { type: 'ageValidation', message: '· Debes ser mayor de edad' },
        ],
        Email: [
            { type: 'required', message: '·El correo electrónico es obligatorio.', },
            { type: 'pattern', message: '· Correo incorrecto.' },
        ],
    };
}