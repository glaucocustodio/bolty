import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../providers/db';
import {UserSession} from '../../providers/user_session';
import {SetPage} from '../set/set';

@Component({
  templateUrl: 'signup.html'
})
export class SignupPage {
  signupForm: FormGroup;

  constructor(public nav: NavController, form: FormBuilder, public alertCtrl: AlertController, public userSession: UserSession, public db: DB) {
    this.signupForm = form.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  signup(formData){
    let message: string

    this.db.signupUser(formData, (err, response) => {

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
      this.db.loginUser(formData, (err, response) => {}, (response) => {
        this.userSession.set(response)
        this.nav.push(SetPage);
      })
    })
  }
}
