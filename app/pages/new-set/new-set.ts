import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../db';

@Component({
  templateUrl: 'build/pages/new-set/new-set.html',
})
export class NewSetPage {
  newSetForm: FormGroup;

  constructor(form: FormBuilder, private navCtrl: NavController) {
    this.newSetForm = form.group({
      name: ["", Validators.required]
    })
  }

  createSet(formData) {
    DB.put("set", formData)
  }
}
