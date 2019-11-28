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
import { BonosComponent } from './components/bonos/bonos.component';
import { InfoComponent } from './components/info/info.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { CreateTariffComponent } from './components/tariff/create-tariff/create-tariff.component';
import { ViewTariffComponent } from './components/tariff/view-tariff/view-tariff.component';
import { CreateLocationComponent } from './components/info/create-location/create-location.component';
import { ClientWarningsComponent } from './components/warnings/client.warnings.component';
import { ManageSubscriptionsComponent } from './components/administrator/manage.subscriptions/manage.subscriptions.component';
import { CreateSubscriptionComponent } from './components/administrator/manage.subscriptions/create.subscription/create.subscription.component';
import { ViewSubscriptionComponent } from './components/administrator/manage.subscriptions/view.subscription/view.subscription.component';
import { HistorialesComponent } from './components/historiales/historiales.component';
import { HistorialPagosComponent } from './components/historial-pagos/historial-pagos.component';
import { HistorialDenunciasComponent } from './components/historial-denuncias/historial-denuncias.component';
import { CreateWarningComponent } from './components/administrator/manage.warnings/create-warning/create-warning.component';
import { AdministratorWarningsComponent } from './components/administrator/manage.warnings/manage.warnings/administrator.manage.warnings.component';

const routes: Routes = [
    {
        path: 'authentication',
        component: AuthenticationComponent
    },
    {
        path: 'historiales',
        component: HistorialesComponent
    },
    {
        path: 'historialDenuncias',
        component: HistorialDenunciasComponent
    },
    {
        path: 'historialPagos',
        component: HistorialPagosComponent
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
                path: 'bonos',
                component: BonosComponent
            },
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
                    },
                    {
                        path: 'tariff/view-tariff',
                        component: ViewTariffComponent
                    },
                    {
                        path: 'manage-subscriptions',
                        component: ManageSubscriptionsComponent
                    },
                    {
                        path: 'manage-subscriptions/create-subscription',
                        component: CreateSubscriptionComponent
                    },
                    {
                        path: 'manage-subscriptions/view-subscription',
                        component: ViewSubscriptionComponent
                    },
                    {
                        path: 'manage-warnings',
                        component: AdministratorWarningsComponent
                    },
                    {
                        path: 'manage-warnings/create-warning',
                        component: CreateWarningComponent
                    }
                ]
            },
            {
                path: 'warnings',
                component: ClientWarningsComponent,
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
        component: InfoComponent,
    },
    {
        path: 'info/add-location',
        component: CreateLocationComponent
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
