import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { DB } from '../providers/db';
import { UserSession } from '../providers/user_session';

import { CardPage } from '../pages/card/card';
import { NewCardPage } from '../pages/new-card/new-card';
import { EditCardPage } from '../pages/edit-card/edit-card';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { SetPage } from '../pages/set/set';
import { NewSetPage } from '../pages/new-set/new-set';
import { MemorizationPage } from '../pages/memorization/memorization';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    CardPage,
    NewCardPage,
    EditCardPage,
    LoginPage,
    SignupPage,
    SetPage,
    NewSetPage,
    MemorizationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,

    CardPage,
    NewCardPage,
    EditCardPage,
    LoginPage,
    SignupPage,
    SetPage,
    NewSetPage,
    MemorizationPage

  ],
  providers: [
    DB,
    UserSession,
    Storage
  ]
})
export class AppModule {}
