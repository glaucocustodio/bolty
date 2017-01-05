import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DB} from '../../providers/db';
import {CardBuilder} from '../../helpers/card_builder';
const Papa = require("papaparse");
/*
  Generated class for the ImportCard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-import-card',
  templateUrl: 'import-card.html'
})
export class ImportCardPage {
  importCardForm: FormGroup;
  set: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, form: FormBuilder, public toastCtrl: ToastController, public db: DB) {
    this.set = navParams.get("set")
    this.importCardForm = form.group({
      separator: ["----", Validators.required],
      cards: ["", Validators.required],
    })
  }

  importCards(event){
    console.log("estou aqui")
    event.preventDefault()

    Papa.parse(
      this.importCardForm.value.cards,
      {
        delimiter: this.importCardForm.value.separator,
        complete: (result) => {
          let allCards = result.data.map((current) => {
            return CardBuilder.call({front: current[0], back: current[1]}, this.set)
          })

          this.db.putAll("card", allCards).then(() => {
            this.presentToast(`${result.data.length} cards imported`)
          }).catch(() => {
            this.presentToast(`Failed to import ${result.data.length} cards`)
          })
        }
      }
    )
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  cancel(event = null) {
    if (event) {
      event.preventDefault()
    }
    this.navCtrl.pop();
  }
}
