import { Component, OnInit } from '@angular/core';
import { CurrentUserData } from 'src/app/data/current.user';
import { MainComponent } from '../main/main.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.scss', '../../globalCSS/common.scss'],
})
export class CheckerComponent implements OnInit {
  constructor(private mainComponent: MainComponent, private router: Router) {
  }

  ngOnInit() {}

  changeToClientView() {
    this.mainComponent.HideBar = false;
    this.router.navigateByUrl('main/park');
  }

  comprobarMatricula(){
    this.router.navigateByUrl('main/checker/plate-check-options');
  }
}
