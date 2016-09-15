import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, Events, MenuController, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
//import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {SetPage} from './pages/set/set';
import {UserSession} from './providers/user_session';
import {DB} from './providers/db';


@Component({
  templateUrl: './build/app.html',
  providers: [NavController, UserSession, DB]
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  private rootPage: any;
  private pages: any[];
  private protectedPages: any[];

  constructor(private platform: Platform, private menu: MenuController, private userSession: UserSession, private events: Events) {
    this.menu = menu;
    this.pages = [
      { title: 'Signup', component: SignupPage },
    ]
    this.protectedPages = [
      { title: 'Sets', component: SetPage },
    ];
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    //this.user = this.userSession.getVal("current")
    console.log("I am here")
    // console.log(this.userSession.getVal("current"))

    // this.menu.enable(true, 'loggedOutMenu');
    // this.menu.enable(true, 'loggedOutMenu');
    this.listenToLoginEvents();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });
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

ionicBootstrap(MyApp);
