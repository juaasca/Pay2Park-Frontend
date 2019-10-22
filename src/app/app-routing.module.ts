import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ParkComponent } from './components/park/park.component';
import { NotificationComponent } from './components/notification/notification.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { ManageClientsComponent } from './components/administrator/manage.clients/manage.clients.component';
import { MainComponent } from './components/main/main.component';
import { InfoClientComponent } from './components/administrator/manage.clients/info-client/info-client.component';
import { InfoPlatesComponent } from './components/administrator/manage.clients/info-client/info-plates/info-plates.component';
import { InfoComplaintsComponent } from './components/administrator/manage.clients/info-client/info-complaints/info-complaints.component';
import { ParkConfirmComponent } from './components/park-confirm/park-confirm.component';
import { AnadirVehiculoComponent } from './components/anadir-vehiculo/anadir-vehiculo.component';
import { CheckerComponent } from './components/checker/checker.component';
import { CheckPlateComponent } from './components/checker/check-plate/check-plate.component';
import { AuthGuard } from './security/authGuard';

const routes: Routes = [
    {
        path: 'authentication',
        component: AuthenticationComponent
    },
    {
        path: 'main',
        component: MainComponent,
        canActivate: [AuthGuard],
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
            },
            {
                path: 'admin',
                component: AdministratorComponent,
                children: [
                    {
                        path: 'manage-clients',
                        component: ManageClientsComponent,
                    },
                    {   path: 'manage-clients/info-client',
                        component: InfoClientComponent
                    },
                    {
                        path: 'manage-clients/info-client/info-plates',
                        component: InfoPlatesComponent
                    },
                    {
                        path: 'manage-clients/info-client/info-complaints',
                        component: InfoComplaintsComponent
                    }
                ]
            },
            {
                path: 'checker',
                component: CheckerComponent,
                children: [
                    {
                        path: 'check-plate',
                        component: CheckPlateComponent,
                    }
                ]
            },
        ]
    },
    {
        path: 'parkConfirm',
        component: ParkConfirmComponent
    },
    {
        path: 'payment',
        component: PaymentComponent
    },
    {
        path: 'anadir-vehiculo',
        component: AnadirVehiculoComponent
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
