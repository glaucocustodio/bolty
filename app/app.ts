import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, MenuController, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
//import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {SetPage} from './pages/set/set';


@Component({
  templateUrl: './build/app.html',
  providers: [NavController]
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  private rootPage: any;
  private pages: any[];

  constructor(private platform: Platform, private menu: MenuController) {
    this.menu = menu;
    this.pages = [
        { title: 'Home', component: LoginPage },
        { title: 'Signup', component: SignupPage },
        { title: 'Sets', component: SetPage },
    ];
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.menu.close()
    // Using this.nav.setRoot() causes
    // Tabs to not show!
    this.nav.push(page.component);
  }
}

ionicBootstrap(MyApp);
