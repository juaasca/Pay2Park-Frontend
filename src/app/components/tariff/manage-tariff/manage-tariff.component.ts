import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-tariff',
  templateUrl: './manage-tariff.component.html',
  styleUrls: ['./manage-tariff.component.scss'],
})
export class ManageTariffComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

}
