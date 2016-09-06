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

  constructor(public nav: NavController, public alertFo: AlertController, form: FormBuilder) {
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
    DB.loginUser(formData, function(err, response) {
      console.log('something went wrong')
      // console.log(err)
      // console.log(response)

      let coolAlert = this.alertFo.create({
        title: "Cool alert",
        message: "I am a cool alert"
      });
      coolAlert.present();
      //console.log(this.alertCtrl)

      // let alert = alertCtrl.create({
      //   title: "Error",
      //   subTitle: err.message,
      //   buttons: ['OK']
      // });
      // alert.present();
    })
  }

  openPage(page) {
    this.nav.push(page);
  }
}
