import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SignupPage} from '../signup/signup';

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  private signupPage: any;

  constructor(public nav: NavController) {
     this.signupPage = SignupPage
     this.nav = nav
  }

  openPage(page) {
    this.nav.push(page);
  }
}
