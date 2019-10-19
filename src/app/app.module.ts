import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { OpenALPR } from "@ionic-native/openalpr/ngx";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Camera } from "@ionic-native/camera/ngx";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ParkComponent } from './components/park/park.component';
import { NotificationComponent } from './components/notification/notification.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { ManageClientsComponent } from './components/administrator/manage.clients/manage.clients.component';
import { InfoClientComponent } from './components/administrator/manage.clients/info-client/info-client.component';
import { FilterPipe } from './services/pipes/filter.pipe';
import { AgmCoreModule } from '@agm/core';
import { MainComponent } from './components/main/main.component';
import { InfoPlatesComponent } from './components/administrator/manage.clients/info-client/info-plates/info-plates.component';
import { InfoComplaintsComponent } from './components/administrator/manage.clients/info-client/info-complaints/info-complaints.component';
import { HomeComponent } from "./page/home/home.component";
import { ResultModal } from "./page/result/result.component";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        MainComponent,
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
        FilterPipe,
        HomeComponent,
        ResultModal,
    ],
    entryComponents: [ResultModal ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        IonicModule,
        CommonModule,
        FormsModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBSDayklms5cTWbXXthMGhwhwy80WN-RA0'
          }),
        ReactiveFormsModule],
        providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
         Camera,
         OpenALPR
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}