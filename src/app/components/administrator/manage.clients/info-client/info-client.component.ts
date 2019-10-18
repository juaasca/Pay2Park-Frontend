import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss'],
})
export class InfoClientComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  showPlates(){
    this.router.navigateByUrl('main/admin/manage-clients/info-client/info-plates');
  }

  showComplaints(){
    this.router.navigateByUrl('main/admin/manage-clients/info-client/info-complaints');
  }
}
