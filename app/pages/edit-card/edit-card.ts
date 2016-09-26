import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../providers/db';

@Component({
  templateUrl: 'build/pages/edit-card/edit-card.html',
  providers: [DB]
})
export class EditCardPage {
  editCardForm: FormGroup;
  card: any;

  constructor(form: FormBuilder, private viewCtrl: ViewController, private navCtrl: NavController, private navParams: NavParams, private db: DB) {
    this.card = navParams.get("card")
    console.log(this.card)

    this.editCardForm = form.group({
      front: [this.card.front, Validators.required],
      back: [this.card.back, Validators.required]
    })
  }

  editCard(formData) {
    //console.log(formData)

    //this.db.get(formData)

    let obj = Object.assign(
      this.card,
      formData
    )
    //console.log(obj)
    this.db.update("card", obj)
    this.viewCtrl.dismiss()
  }
}
