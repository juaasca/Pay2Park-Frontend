import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})

export class ForgotComponent implements OnInit {
  private forgot: FormGroup;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  recover() {
    this.router.navigateByUrl('authentication');
  }

  back(){
    this.router.navigateByUrl('authentication');
  }

}
