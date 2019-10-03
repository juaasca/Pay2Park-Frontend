import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { TabsComponent } from './tabs/tabs.component';
import { ParkComponent } from './park/park.component';
import { NotificationComponent } from './notification/notification.component';
import { WalletComponent } from './wallet/wallet.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotComponent } from './forgot/forgot.component';
import { InitializeService } from './services/dao/initialize.service';


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
        InitializeService,
        { provide: APP_INITIALIZER, useFactory: (init: InitializeService) => function () { return init.initialize() } },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
