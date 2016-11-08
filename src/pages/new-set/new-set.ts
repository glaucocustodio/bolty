import { Component } from '@angular/core';
import { NavParams,  ViewController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../providers/db';

@Component({
  templateUrl: 'new-set.html',
})
export class NewSetPage {
  newSetForm: FormGroup;
  user_id: any;

  constructor(form: FormBuilder, public navParams: NavParams, public db: DB, public viewCtrl: ViewController) {
    this.newSetForm = form.group({
      name: ["", Validators.required]
    })

    this.user_id = navParams.get("user_id")
  }

  createSet(formData) {
    let obj = Object.assign(
      formData,
      {user_id: this.user_id}
     )
    console.log("create set")
    this.db.put("set", obj)
  }

  cancel() {
    this.viewCtrl.dismiss()
  }
}
