import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserData } from 'src/app/data/current.user';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.scss'],
})
export class HistorialesComponent implements OnInit {

color: string;
  constructor(private router: Router, private darkMode: DarkModeService) { }

  ngOnInit() {
    this.color = CurrentUserData.color;
    //this.isHistorial = false;
    setInterval(() => {
      this.color = CurrentUserData.color;
  }, 100);
  }

  pagos() {
    this.router.navigateByUrl('historialPagos');
  }

  denuncias() {
    this.router.navigateByUrl('historialDenuncias');
  }

}

