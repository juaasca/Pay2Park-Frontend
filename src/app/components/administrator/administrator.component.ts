import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  manageClients(){
    this.router.navigateByUrl('manage-clients');
  }

}
