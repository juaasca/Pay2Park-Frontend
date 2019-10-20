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
    private isChecker: boolean;
    public AdminWindow: boolean = false;
    CheckerWindow: boolean;
    constructor(private router: Router) {
        this.isAdmin = CurrentUserData.IsAdmin;
        this.isChecker = CurrentUserData.IsChecker;
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
            case "checkerView":
                this.CheckerWindow = true;
                this.router.navigateByUrl('main/checker/check-plate');

                break;
        }
    }

}
