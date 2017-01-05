import { Component } from '@angular/core';
import { NavParams,  ViewController, Events } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../providers/db';

@Component({
  templateUrl: 'new-set.html',
})
export class NewSetPage {
  newSetForm: FormGroup;
  user_id: any;

  constructor(public form: FormBuilder, public navParams: NavParams, public db: DB, public viewCtrl: ViewController, public events: Events) {
  }

  ngOnInit(){
    this.newSetForm = this.form.group({
      name: [null, Validators.required]
    })

    this.user_id = this.navParams.get("user_id")
  }

  createSet(formData) {
    let obj = Object.assign(formData, { user_id: this.user_id })
    this.db.put("set", obj)
    this.cancel()
    this.events.publish('sets:changed');
  }

  cancel(event = null) {
    if (event) {
      event.preventDefault()
    }
    this.viewCtrl.dismiss()
  }
}
