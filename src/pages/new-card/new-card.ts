import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../providers/db';
import {CardBuilder} from '../../helpers/card_builder';

@Component({
  templateUrl: 'new-card.html'
})
export class NewCardPage {
  newCardForm: FormGroup;
  set: any;

  constructor(public form: FormBuilder, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public db: DB, public events: Events) {
  }

  ngOnInit(){
    this.set = this.navParams.get("set")

    this.newCardForm = this.form.group({
      front: ["", Validators.required],
      back: ["", Validators.required]
    })
  }

  createCard(formData) {
    let card = CardBuilder.call(formData, this.set)
    this.db.put("card", card)
    this.events.publish('cards:changed');
    this.cancel()
  }

  cancel(event = null) {
    if (event) {
      event.preventDefault()
    }
    this.viewCtrl.dismiss()
  }
}
