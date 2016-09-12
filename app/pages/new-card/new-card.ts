import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../db';

@Component({
  templateUrl: 'build/pages/new-card/new-card.html',
})
export class NewCardPage {
  newCardForm: FormGroup;
  set: any;

  constructor(form: FormBuilder, private navCtrl: NavController, private navParams: NavParams) {
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
        set_id: this.set._id
      }
    )
    console.log(obj)
    DB.put("card", obj)
  }
}
