import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor(private router: Router) { }

    ngOnInit() {

    }

    click(tab: number) {
        switch (tab) {
            case 1:
                this.router.navigateByUrl('main/park');
                break;
            case 2:
                this.router.navigateByUrl('main/notification');
                break;
            case 3:
                this.router.navigateByUrl('main/wallet');
                break;
            case 4:
                this.router.navigateByUrl('main/profile');
                break;
        }
    }

}
