import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, AlertController, Events} from 'ionic-angular';
import {DB} from '../../providers/db';
import {UserSession} from '../../providers/user_session';
import {SignupPage} from '../signup/signup';
import {SetPage} from '../set/set';

@Component({
  templateUrl: 'login.html',
})
export class LoginPage {
  public signupPage: any;
  loginForm: FormGroup;

  constructor(public nav: NavController, form: FormBuilder, public alertCtrl: AlertController, public userSession: UserSession, public db: DB, public events: Events) {
     this.signupPage = SignupPage

      this.userSession.get().then((response) => {
        if(response) {
          this.events.publish('user:login', response);
          this.goToNextPage()
        }
      })

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
    this.db.loginUser(formData, (err, response) => {
      let alert = this.alertCtrl.create({
        title: 'Sorry',
        subTitle: err.message,
        buttons: ['Ok']
      });
      alert.present();
    }, (response) => {
      this.goToNextPage()
    })
  }

  goToNextPage(){
    // this.nav.push(SetPage);
    // rewrite the stack history
    this.nav.setPages([
      { page: SetPage }
    ]);
  }

  openPage(page) {
    this.nav.push(page);
  }
}
