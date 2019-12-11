import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { WindowStats } from 'src/app/data/window.status';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss', '../../globalCSS/common.scss'],
})
export class AdministratorComponent implements OnInit {
  constructor(private router: Router, private mainComponent: MainComponent) { }

  ngOnInit() {}

  manageClients(){
    this.router.navigateByUrl('main/admin/manage-clients');
  }

  manageCheckers() {
    this.router.navigateByUrl('main/admin/manage-checkers');
  }

  manageTariffs() {
    this.router.navigateByUrl('main/admin/tariff');
  }

  manageSubscriptions() {
    this.router.navigateByUrl('main/admin/manage-subscriptions');
  }

  manageWarnings() {
    this.router.navigateByUrl('main/admin/manage-warnings');
  }

  changeToClientView() {
    WindowStats.AdminWindowIsActive = false;
    this.mainComponent.HideBar = false;
    this.router.navigateByUrl('main/park');
  }
}