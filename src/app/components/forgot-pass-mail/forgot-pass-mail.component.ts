import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserActions } from 'src/app/logic/user.actions.service';

@Component({
  selector: 'app-forgot-pass-mail',
  templateUrl: './forgot-pass-mail.component.html',
  styleUrls: ['./forgot-pass-mail.component.scss'],
})
export class ForgotPassMailComponent implements OnInit {

  constructor(
    private router: Router,
    private userActions: UserActions) {}

  ngOnInit() {}

}
