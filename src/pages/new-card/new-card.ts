import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../providers/db';

@Component({
  templateUrl: 'new-card.html'
})
export class NewCardPage {
  newCardForm: FormGroup;
  set: any;

  constructor(form: FormBuilder, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public db: DB) {
    this.set = navParams.get("set")

    this.newCardForm = form.group({
      front: ["", Validators.required],
      back: ["", Validators.required]
    })
  }

  createCard(formData) {
    let obj = Object.assign(
      formData,
      {
        set_id: this.set._id,
        user_id: this.set.user_id,
        memorized: false
      }
    )
    this.db.put("card", obj)
    this.cancel()
  }

  cancel(event = null) {
    if (event) {
      event.preventDefault()
    }
    this.viewCtrl.dismiss()
  }
}
