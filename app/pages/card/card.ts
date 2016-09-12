import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {NewCardPage} from '../new-card/new-card';
import {DB} from '../../db';

@Component({
  templateUrl: 'build/pages/card/card.html',
})
export class CardPage {
  set: any;
  cards: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, public modalCtrl: ModalController) {
    this.set = navParams.get("set").doc
    this.init()
  }

  init() {
    DB.all("card", (result) => {
      this.cards = result.rows
      console.log(result)
    })
  }

  openModal() {
    let modal = this.modalCtrl.create(NewCardPage, {set: this.set});
    modal.present();
  }

  enter(card) {

  }

  searchItems(event) {
    this.init()

    // set val to the value of the searchbar
    let val = event.target.value;
console.log("Buscado " + val)
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {

      this.cards = this.cards.filter((item) => {
        let front = item.doc.front.toLowerCase()
        let back = item.doc.back.toLowerCase()
        console.log(front)
        console.log(back)

        return (front.indexOf(val) > -1) || (back.indexOf(val) > -1);
      })
    }
  }

}
