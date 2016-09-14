import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, AlertController} from 'ionic-angular';
import {DB} from '../../db';
import {UserSession} from '../../providers/user_session';
import {SignupPage} from '../signup/signup';
import {SetPage} from '../set/set';

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  private signupPage: any;
  loginForm: FormGroup;

  constructor(public nav: NavController, form: FormBuilder, private alertCtrl: AlertController, public userSession: UserSession) {
     this.signupPage = SignupPage

      // name should match [ngFormModel] in your html
      // Setting fields as required
     this.loginForm = form.group({
       // 'username': '',
       // 'password': ''
       username: ["", Validators.required],
       password: ["", Validators.required]
     })
  }

  login(formData){
    DB.loginUser(formData, (err, response) => {
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        subTitle: err.message,
        buttons: ['Ok']
      });
      alert.present();
    }, (response) => {
      this.userSession.set(response)
      this.nav.push(SetPage);
    })
  }

  openPage(page) {
    this.nav.push(page);
  }
}
