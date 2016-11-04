import { Component, ViewChild } from '@angular/core';
import { Platform, Events, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import {Storage} from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

import { DB } from '../providers/db';
import { UserSession } from '../providers/user_session';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SetPage } from '../pages/set/set';


@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage = LoginPage;

  @ViewChild(Nav) nav: Nav;
  public pages: any[];
  public protectedPages: any[];

//, public db: DB
  constructor(platform: Platform, public menu: MenuController, public userSession: UserSession, public events: Events, public db: DB, public storage: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    this.menu = menu;
    this.pages = [
      { title: 'Signup', component: SignupPage },
    ]
    this.protectedPages = [
      { title: 'Sets', component: SetPage },
    ];

    this.enableMenu(true);
  }

  logout() {
    console.log("logout user")
    this.storage.remove('hasUserLogged')
    this.db.logoutUser()
    this.openPage({component: LoginPage})
  }

  openPage(page) {
    this.menu.close()
    // Using this.nav.setRoot() causes
    // Tabs to not show!
    this.nav.push(page.component);
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}