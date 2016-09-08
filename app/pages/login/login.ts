import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, AlertController} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {DB} from '../../db';

@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  private signupPage: any;
  loginForm: FormGroup;

  constructor(public nav: NavController, form: FormBuilder, private alertCtrl: AlertController) {
     this.signupPage = SignupPage
     this.nav = nav

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
    let that = this

    DB.loginUser(formData, (err, response) => {
      let alert = that.alertCtrl.create({
        title: 'Sorry',
        subTitle: err.message,
        buttons: ['Ok']
      });
      alert.present();
    })
  }

  openPage(page) {
    this.nav.push(page);
  }
}
