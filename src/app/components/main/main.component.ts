import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserData } from 'src/app/data/current.user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
    private isAdmin: boolean;
    public AdminWindow: boolean = false;
    constructor(private router: Router) {
        this.isAdmin = CurrentUserData.IsAdmin;
    }

    ngOnInit() {

    }

    click(tab: string) {
        switch (tab) {
            case "park":
                this.router.navigateByUrl('main/park');
                break;
            case "notifications":
                this.router.navigateByUrl('main/notification');
                break;
            case "wallet":
                this.router.navigateByUrl('main/wallet');
                break;
            case "profile":
                this.router.navigateByUrl('main/profile');
                break;
            case "adminView":
                this.AdminWindow = true;
                this.router.navigateByUrl('main/admin/manage-clients');
            break;
            case "scan": 
                this.router.navigateByUrl('main/scan');
                break;
             case "prueba": 
                this.router.navigateByUrl('main/result');
                break;
        }
    }

}
