import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plate.check.options',
  templateUrl: './plate.check.options.component.html',
  styleUrls: ['./plate.check.options.component.scss', '../../../globalCSS/common.scss'],
})
export class PlateCheckOptionsComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {}

  insertManually() {
    this.router.navigateByUrl('main/checker/manually-insert');
  }

  useCamera() {
    this.router.navigateByUrl('main/checker/scan');
  }

}
