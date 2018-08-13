import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, ItemSliding } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
//page
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import {LoginPage} from  '../pages/login/login';
import {ForgotpasswordPage} from  '../pages/forgotpassword/forgotpassword';
import {SetpinPage} from '../pages/setpin/setpin';
import {ConfirmpinPage} from '../pages/confirmpin/confirmpin';
import {SetfingerPage} from '../pages/setfinger/setfinger';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//locale
import localeTh from '@angular/common/locales/th';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeTh);
// Plugin
import {Network} from '@ionic-native/network';
import {SQLite} from '@ionic-native/sqlite';
import {AppVersion} from '@ionic-native/app-version';
import {Camera} from '@ionic-native/camera';
import {QRScanner} from '@ionic-native/qr-scanner';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio';
import { IonicStorageModule } from '@ionic/storage';
import {InAppBrowser} from '@ionic-native/in-app-browser';
//Provider
import { ApiProvider } from '../providers/api/api';
import { UserloginProvider } from '../providers/userlogin/userlogin';
import { CommonProvider } from '../providers/common/common';
import { OmmMeetingListProvider } from '../providers/omm-meeting-list/omm-meeting-list';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ForgotpasswordPage,
    SetpinPage,
    ConfirmpinPage,
    SetfingerPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    //config storage module
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ForgotpasswordPage,
    SetpinPage,
    ConfirmpinPage,
    SetfingerPage
  ],
  providers: [
    StatusBar,
    { provide: LOCALE_ID, useValue: 'th-TH' },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // plugin
    Network,
    SQLite,
    AppVersion,
    SplashScreen,
    Camera,
    QRScanner,
    FingerprintAIO,
    //providor
    ApiProvider,
    UserloginProvider,
    CommonProvider,
    OmmMeetingListProvider
  ]
})
export class AppModule {}
