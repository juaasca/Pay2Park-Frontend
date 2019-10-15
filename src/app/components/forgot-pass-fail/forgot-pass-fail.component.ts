import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserActions } from 'src/app/logic/user.actions.service';

@Component({
  selector: 'app-forgot-pass-fail',
  templateUrl: './forgot-pass-fail.component.html',
  styleUrls: ['./forgot-pass-fail.component.scss'],
})
export class ForgotPassFailComponent implements OnInit {

  constructor(
    private route: Router,
    private userActions: UserActions) { }

  ngOnInit() {}

}
