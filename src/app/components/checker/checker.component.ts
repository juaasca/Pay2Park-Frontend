import { Component, OnInit } from '@angular/core';
import { CurrentUserData } from 'src/app/data/current.user';
import { MainComponent } from '../main/main.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checker',
  templateUrl: './checker.component.html',
  styleUrls: ['./checker.component.scss'],
})
export class CheckerComponent implements OnInit {
  private isChecker = false;

  constructor(private mainComponent: MainComponent, private router: Router) {
    this.isChecker = CurrentUserData.IsChecker;
  }

  ngOnInit() {}

  changeToClientView() {
    this.mainComponent.CheckerWindow = false;
    this.router.navigateByUrl('main/park');
  }
}
