import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  constructor(private router: Router, private mainComponent: MainComponent) { }

  ngOnInit() {}

  manageClients(){
    this.router.navigateByUrl('main/admin/manage-clients');
  }

  changeToClientView() {
    this.mainComponent.AdminWindow = false;
    this.router.navigateByUrl('main/park');
  }

}
