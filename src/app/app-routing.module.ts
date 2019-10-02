import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component';
import { TabsComponent } from './tabs/tabs.component';
import { ProfileComponent } from './profile/profile.component';
import { ParkComponent } from './park/park.component';
import { NotificationComponent } from './notification/notification.component';
import { WalletComponent } from './wallet/wallet.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
    {
        path: 'authentication',
        component: AuthenticationComponent
    },
    {
        path: 'tabs',
        component: TabsComponent,
        children: [
            {
                path: 'park',
                component: ParkComponent
            },
            {
                path: 'notification',
                component: NotificationComponent
            },
            {
                path: 'wallet',
                component: WalletComponent
            },
            
            {
                path: 'profile',
                component: ProfileComponent
            }
        ]
    },
    {
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: '**',
        redirectTo: 'authentication'
    }
    
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
