import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserActions } from 'src/app/logic/user.actions.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss', '../../globalCSS/common.scss'],
})

export class ForgotComponent implements OnInit {
  private forgot: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userActions : UserActions,
    private alertController : AlertController) { 
    this.forgot = this.formBuilder.group({
      Email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
        ]))
      })
    }

  ngOnInit() {}

  async recover() {
    var formValue = this.forgot.value;
    this.userActions.recoverPassword(formValue.Email)
      .then(async() => await this.passSuccRecovered())
      .catch(async(error) => await this.passFailedRecover(error.message));
  }

  async passSuccRecovered() {
    const alert = await this.alertController.create({
        header: 'Correcto',
        message: 'Se ha enviado el correo a la dirección indicada',
        buttons: [
            {
                text: 'Aceptar',
                handler: () => {
                    this.back();
                }
            }
        ]
    });

    await alert.present();
}

async passFailedRecover(error: string) {
    const alert = await this.alertController.create({
        header: 'Error',
        message: 'La dirección de correo indicada no esta asociada a ninguna cuenta',
        buttons: [
            {
                text: 'Cancelar',
                handler: () => {
                    this.back();
                }
            },
            {
                text: 'Reintentar',
                handler: () => {
                    alert.dismiss();
                }
            }
        ]
    });

    await alert.present();
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
