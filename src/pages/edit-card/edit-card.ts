import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../providers/db';

@Component({
  templateUrl: 'edit-card.html'
})
export class EditCardPage {
  editCardForm: FormGroup;
  card: any;

  constructor(public form: FormBuilder, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public db: DB, public events: Events) {
  }

  ngOnInit(){
    this.card = this.navParams.get("card")

    this.editCardForm = this.form.group({
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
    this.events.publish('cards:changed');
    this.viewCtrl.dismiss()
  }

  cancel(event) {
    event.preventDefault()
    this.viewCtrl.dismiss()
  }
}
