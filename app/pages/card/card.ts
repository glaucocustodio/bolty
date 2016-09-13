import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import {NewCardPage} from '../new-card/new-card';
import {DB} from '../../db';

@Component({
  templateUrl: 'build/pages/card/card.html',
})
export class CardPage {
  set: any;
  cards: any;
  searchTerm: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.set = navParams.get("set")

    DB.con().changes({
      since: 'now',
      live: true,
    }).on('change', (_change) => {
      this.init()
    })

    this.init()
  }

  init(callback = null) {
    DB.all("card", {set_id: this.set._id}, (result) => {
      this.cards = result

      if (callback != null) {
        callback(this)
      }
    })
  }

  openModal() {
    let modal = this.modalCtrl.create(NewCardPage, {set: this.set});
    modal.present();
  }

  edit(card) {

  }

  delete(card) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes, I am sure',
          handler: () => {
            DB.delete(card._id)
          }
        }
      ]
    })
    confirm.present()
  }

  filterItems(that) {
    // if the value is an empty string don't filter the items
    if (that.searchTerm && that.searchTerm.trim() != '') {

      that.cards = that.cards.filter((item) => {
        let front = item.front.toLowerCase()
        let back = item.back.toLowerCase()
        console.log(`front: ${front} | back: ${back}`)
        console.log('f index: ' + front.indexOf(that.searchTerm))
        console.log('b index: ' + back.indexOf(that.searchTerm))

        return (front.indexOf(that.searchTerm) > -1) || (back.indexOf(that.searchTerm) > -1)
      })
    }
  }

  searchItems(event) {
    // set val to the value of the searchbar
    this.searchTerm = event.target.value;
    console.log("Buscado " + this.searchTerm)

    this.init(this.filterItems)
  }

}
