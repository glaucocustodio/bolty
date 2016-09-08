import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from 'ionic-angular';
import {DB} from '../../db';

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  signupForm: FormGroup;

  constructor(form: FormBuilder, private alertCtrl: AlertController) {
    this.signupForm = form.group({
       username: ["", Validators.required],
       password: ["", Validators.required]
     })
  }

  signup(formData){
    let that = this
    let message: string

    DB.signupUser(formData, (err, response) => {
      
      if (err.name === 'conflict') {
        message = 'This username already exists'
      } else if (err.name === 'forbidden') {
        message = 'Invalid username'
      } else {
        message = err.message
      }
      let alert = that.alertCtrl.create({
        title: 'Sorry',
        subTitle: message,
        buttons: ['Ok']
      });
      alert.present();

    }, (response) => {
      DB.loginUser(formData, (err, response) => {})
    })
  }
}
