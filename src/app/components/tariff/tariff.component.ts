import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tariff } from 'src/app/Domain/Tariff';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss'],
})
export class TariffComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit() {}

  create(){
    this.router.navigateByUrl('main/admin/tariff/create-tariff');
  }

  manage(){
    this.router.navigateByUrl('main/admin/tariff/manage-tariff');
  }

}