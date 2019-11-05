import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PayPal } from '@ionic-native/paypal/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AgmCoreModule } from '@agm/core';

import { FilterClientPipe } from './services/pipes/filter.clients.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ParkComponent } from './components/park/park.component';
import { NotificationComponent } from './components/notification/notification.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { ManageClientsComponent } from './components/administrator/manage.clients/manage.clients.component';
import { InfoClientComponent } from './components/administrator/manage.clients/info-client/info-client.component';
import { MainComponent } from './components/main/main.component';
import { InfoPlatesComponent } from './components/administrator/manage.clients/info-client/info-plates/info-plates.component';
import { InfoComplaintsComponent } from './components/administrator/manage.clients/info-client/info-complaints/info-complaints.component';
import { ParkConfirmComponent } from './components/park-confirm/park-confirm.component';
import { AnadirVehiculoComponent } from './components/anadir-vehiculo/anadir-vehiculo.component';
import { CheckerComponent } from './components/checker/checker.component';
import { CheckPlateComponent } from './components/checker/check-plate/check-plate.component';
import { AuthGuard } from './security/authGuard';
import { ScanComponent } from './components/checker/scan/scan.component';
import { ResultModal } from './components/checker/result/result.component';
import { Camera } from "@ionic-native/camera/ngx";
import { OpenALPR } from '@ionic-native/openalpr/ngx';
import { FilterCheckersPipe } from './services/pipes/filter.checkers.pipe';
import { ManageCheckersComponent } from './components/administrator/manage.checkers/manage.checkers.component';
import { InfoCheckerComponent } from './components/administrator/manage.checkers/info.checker/info.checker.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CreateCheckerComponent } from './components/administrator/manage.checkers/create.checker/create.checker.component';
import { InfoComponent } from './components/info/info.component';
import { TariffComponent } from './components/tariff/tariff.component';
import { CreateTariffComponent } from './components/tariff/create-tariff/create-tariff.component';
import { ManageTariffComponent } from './components/tariff/manage-tariff/manage-tariff.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        MainComponent,
        InfoComponent,
        ParkComponent,
        NotificationComponent,
        WalletComponent,
        PaymentComponent,
        ProfileComponent,
        RegistrationComponent,
        ForgotComponent,
        AdministratorComponent,
        ManageClientsComponent,
        InfoClientComponent,
        InfoPlatesComponent,
        InfoComplaintsComponent,
        FilterClientPipe,
        ParkConfirmComponent,
        AnadirVehiculoComponent,
        CheckerComponent,
        CheckPlateComponent,
        ScanComponent,
        ResultModal,
        ManageCheckersComponent,
        FilterCheckersPipe,
        InfoCheckerComponent,
        CreateCheckerComponent,
        TariffComponent,
        CreateTariffComponent,
        ManageTariffComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBSDayklms5cTWbXXthMGhwhwy80WN-RA0'
        }),
        ReactiveFormsModule],
    providers: [
        LocalNotifications,
        StatusBar,
        SplashScreen,
        PayPal,
        AuthGuard,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        ManageClientsComponent,
        Camera,
        OpenALPR
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
