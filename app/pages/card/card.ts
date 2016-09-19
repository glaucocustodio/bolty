import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import {NewCardPage} from '../new-card/new-card';
import {EditCardPage} from '../edit-card/edit-card';
import {DB} from '../../providers/db';

@Component({
  templateUrl: 'build/pages/card/card.html',
})
export class CardPage {
  set: any;
  cards: any;
  searchTerm: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private modalCtrl: ModalController, private alertCtrl: AlertController, private db: DB) {
    this.set = navParams.get("set")

    this.db.onChanges((_change) => {
      this.init()
    })

    this.init()
  }

  init(callback = null) {
    this.db.all("card", {set_id: this.set._id}, (result) => {
      this.cards = result
      console.log(result[0])


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
    let modal = this.modalCtrl.create(EditCardPage, {card: card});
    modal.present();
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
            this.db.delete(card._id)
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
