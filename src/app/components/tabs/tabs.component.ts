import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {



    constructor(private router: Router) { }

    ngOnInit() {

    }

    click(tab: number) {
        switch (tab) {
            case 1:
                this.router.navigateByUrl('tabs/park');
                break;
            case 2:
                this.router.navigateByUrl('tabs/notification');
                break;
            case 3:
                this.router.navigateByUrl('tabs/wallet');
                break;
            case 4:
                this.router.navigateByUrl('tabs/profile');
                break;
            case 5: 
                this.router.navigateByUrl('tabs/scan');
                break;
             case 6: 
                this.router.navigateByUrl('tabs/result');
                break;
        }
    }

}
