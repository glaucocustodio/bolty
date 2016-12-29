import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../providers/db';

@Component({
  templateUrl: 'edit-card.html'
})
export class EditCardPage {
  editCardForm: FormGroup;
  card: any;

  constructor(form: FormBuilder, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public db: DB) {
    this.card = navParams.get("card")
    console.log(this.card)

    this.editCardForm = form.group({
      front: [this.card.front, Validators.required],
      back: [this.card.back, Validators.required]
    })
  }

  editCard(formData) {
    let obj = Object.assign(
      this.card,
      formData
    )
    this.db.update("card", obj)
    this.viewCtrl.dismiss()
  }

  cancel(event) {
    event.preventDefault()
    this.viewCtrl.dismiss()
  }
}
