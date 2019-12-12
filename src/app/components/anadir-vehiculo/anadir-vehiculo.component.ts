import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UserActions } from 'src/app/logic/user.actions.service';
import { UsernameValidatorService } from 'src/app/services/validators/username.validator.service';
import { Vehicle } from 'src/app/Domain/Vehicle';
import { CurrentUserData } from 'src/app/data/current.user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { VehiclesService } from 'src/app/services/dao/vehicles.service';

@Component({
  selector: 'app-anadir-vehiculo',
  templateUrl: './anadir-vehiculo.component.html',
  styleUrls: ['./anadir-vehiculo.component.scss', './../../globalCSS/common.scss'],
})
export class AnadirVehiculoComponent implements OnInit {
  public color: string;
  private registration: FormGroup;
  vehicles: Vehicle[];
  constructor(private formBuilder: FormBuilder, private userActions: UserActions, private usernameValidator: UsernameValidatorService,
    private alertController: AlertController,
    private darkMode: DarkModeService,
    private router: Router, private vehiclesService: VehiclesService) {
      this.vehicles = [];
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

  ngOnInit() {
    this.vehiclesService.getEntitiesAsync().then(vehicles => this.vehiculosUsuario(vehicles));
    this.color = CurrentUserData.color;
    setInterval(() => {
      this.color = CurrentUserData.color;
  }, 1000);
  }
  anadirVehiculo() {
    if (CurrentUserData.LoggedUser) {
      var formValue = this.registration.value;
      this.userActions.registerVehicle(formValue.Matricula, formValue.Marca, formValue.Modelo, CurrentUserData.LoggedUser.Email);
      this.router.navigateByUrl('main/profile');
    }
  }

  vehiculosUsuario(vehicles: Vehicle[]) {
    if (CurrentUserData.LoggedUser) {
        while (vehicles.length > 0) {
            let aux = vehicles.pop();
            if (aux.OwnerEmail == CurrentUserData.LoggedUser.Email) {
                this.vehicles.push(aux);
            }
        }
    }
}
}
