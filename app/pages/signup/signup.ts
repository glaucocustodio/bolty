import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../db';
import {UserSession} from '../../providers/user_session';
import {SetPage} from '../set/set';

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  signupForm: FormGroup;

  constructor(public nav: NavController, form: FormBuilder, private alertCtrl: AlertController, public userSession: UserSession) {
    this.signupForm = form.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  signup(formData){
    let message: string

    DB.signupUser(formData, (err, response) => {

      if (err.name === 'conflict') {
        message = 'This username already exists'
      } else if (err.name === 'forbidden') {
        message = 'Invalid username'
      } else {
        message = err.message
      }
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        subTitle: message,
        buttons: ['Ok']
      });
      alert.present();

    }, (response) => {
      DB.loginUser(formData, (err, response) => {}, (response) => {
        this.userSession.set(response)
        this.nav.push(SetPage);
      })
    })
  }
}
