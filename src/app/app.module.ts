import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ParkComponent } from './components/park/park.component';
import { NotificationComponent } from './components/notification/notification.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotComponent } from './components/forgot/forgot.component';


@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        TabsComponent,
        ParkComponent,
        NotificationComponent,
        WalletComponent,
        ProfileComponent,
        RegistrationComponent,
        ForgotComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
