import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ParkComponent } from './components/park/park.component';
import { NotificationComponent } from './components/notification/notification.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotComponent } from './components/forgot/forgot.component';

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
        path: 'forgot',
        component: ForgotComponent
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
