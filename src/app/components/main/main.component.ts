import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserData } from 'src/app/data/current.user';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss', '../../globalCSS/common.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
    private isAdmin: boolean;
    private isChecker: boolean;
    public HideBar: boolean = false;
    public AdminWindow: boolean = false;
    CheckerWindow: boolean;
    suscription: Subscription;
    color: string;
    constructor(private router: Router, private darkMode: DarkModeService) {
    }

    ngOnInit() {
        this.isAdmin = CurrentUserData.IsAdmin;
        this.isChecker = CurrentUserData.IsChecker;
        this.suscription = this.darkMode.color.subscribe(color => {
            this.color = color;
        });
    }
    ngOnDestroy() {
        this.suscription.unsubscribe();
    }

    click(tab: string) {
        switch (tab) {
            case "park":
                this.router.navigateByUrl('main/park');

                break;
            case "notifications":
                this.router.navigateByUrl('main/notification');

                break;
            case "subscriptions":
                this.router.navigateByUrl('main/bonos');
    
                break;
            case "wallet":
                this.router.navigateByUrl('main/wallet');

                break;
            case "warnings":
                this.router.navigateByUrl('main/warnings');

                break;
            case "profile":
                this.router.navigateByUrl('main/profile');

                break;
            case "adminView":
                this.HideBar = true;
                this.router.navigateByUrl('main/admin/manage-clients');

                break;
            case "checkerView":
                this.HideBar = true;
                this.router.navigateByUrl('main/checker/plate-check-options');

                break;
        }
    }

}
