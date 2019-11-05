import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss'],
})
export class TariffComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  create(){
    this.router.navigateByUrl('main/admin/tariff/create-tariff');
  }

}
