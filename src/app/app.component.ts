import { Component, ViewChild } from '@angular/core';
import { Platform, Events, MenuController, Nav } from 'ionic-angular';

import { DB } from '../providers/db';
import { UserSession } from '../providers/user_session';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import {enableProdMode} from '@angular/core';
enableProdMode();

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage = LoginPage;

  @ViewChild(Nav) nav: Nav;
  public pages: any[];
  public protectedPages: any[];
  public loggedUser: string;

  constructor(platform: Platform, public menu: MenuController, public userSession: UserSession, public events: Events, public db: DB) {
    platform.ready().then(() => {

    });

    this.menu = menu;
    this.pages = [
      { title: 'Signup', component: SignupPage },
    ]
    this.protectedPages = [];

    events.subscribe('user:login', (userData) => {
      this.loggedUser = userData["name"]
      this.enableRestrictMenu(true)
    });

    events.subscribe('user:logout', (_data) => {
      this.menu.close()
      this.enableRestrictMenu(false)

      // rewrite the stack history
      this.nav.setPages([
        { page: LoginPage }
      ]);
    });

  }

  logout() {
    this.userSession.remove()
    this.db.logoutUser()
  }

  openPage(page) {
    this.menu.close()
    // Using this.nav.setRoot() causes
    // Tabs to not show!
    this.nav.push(page.component);
  }

  enableRestrictMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}
