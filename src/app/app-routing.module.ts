import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ParkComponent } from './components/park/park.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PaymentComponent } from './components/payment/payment.component';
import { WalletComponent } from './components/wallet/wallet.component';
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
import { ScanComponent } from './components/checker/scan/scan.component';
import { ManageCheckersComponent } from './components/administrator/manage.checkers/manage.checkers.component';
import { InfoCheckerComponent } from './components/administrator/manage.checkers/info.checker/info.checker.component';
import { CreateCheckerComponent } from './components/administrator/manage.checkers/create.checker/create.checker.component';
import { InfoComponent } from './components/info/info.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { CreateTariffComponent } from './components/tariff/create-tariff/create-tariff.component';

const routes: Routes = [
    {
        path: 'authentication',
        component: AuthenticationComponent
    },
    {
        path: 'payment',
        component: PaymentComponent
    },
    {
        path: 'main',
        component: MainComponent,
        //canActivate: [AuthGuard],
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
                path: 'payemnt',
                component: PaymentComponent
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
                    },
                    {
                        path: 'manage-checkers',
                        component: ManageCheckersComponent
                    },
                    {
                        path: 'manage-checkers/info-checker',
                        component: InfoCheckerComponent
                    },
                    {
                        path: 'manage-checkers/create-checker',
                        component: CreateCheckerComponent
                    },
                    {
                        path: 'tariff',
                        component: TariffComponent
                    },
                    {
                        path: 'tariff/create-tariff',
                        component: CreateTariffComponent
                    }
                ]
            },
            {
                path: 'checker',
                component: CheckerComponent,
                children: [
                    {
                        path: 'check-plate',
                        component: CheckPlateComponent
                    },
                    {
                        path: 'scan',
                        component: ScanComponent
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
        path: 'info',
        component: InfoComponent
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
