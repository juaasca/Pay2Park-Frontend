import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserActions } from 'src/app/logic/user.actions.service';
import { UsernameValidatorService } from 'src/app/services/validators/username.validator.service';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { CurrentUserData } from 'src/app/data/current.user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anadir-vehiculo',
  templateUrl: './anadir-vehiculo.component.html',
  styleUrls: ['./anadir-vehiculo.component.scss'],
})
export class AnadirVehiculoComponent implements OnInit {
  private registration: FormGroup;
  constructor(private formBuilder: FormBuilder,
		            private userActions: UserActions,
		            private usernameValidator: UsernameValidatorService,
                private alertController: AlertController,
                private router: Router) {

    this.registration = this.formBuilder.group({
			Matricula: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$')
				])),
			Marca: new FormControl('', Validators.compose([
					Validators.required
				])),
			Modelo: new FormControl('', Validators.compose([
					Validators.required
				]))
		});
  }

  ngOnInit() {}

  anadirVehiculo() {
    if(CurrentUserData.LoggedUser){
    var formValue = this.registration.value;
    this.userActions.registerVehicle(formValue.Matricula,formValue.Marca,formValue.Modelo,[CurrentUserData.LoggedUser.Email]);
    this.router.navigateByUrl('main/profile');
    }else{console.log('No estas logueado');}
  }
}
