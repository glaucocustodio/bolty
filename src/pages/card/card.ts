import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, Events } from 'ionic-angular';
import {NewCardPage} from '../new-card/new-card';
import {EditCardPage} from '../edit-card/edit-card';
import {DB} from '../../providers/db';

@Component({
  templateUrl: 'card.html',
})
export class CardPage {
  set: any;
  cards: any;
  searchTerm: any;
  cardsCount: number;
  changes: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, public db: DB, public events: Events) {
    this.set = navParams.get("set")

    // this.changes = this.db.onChanges("card", (_changes) => {
    //   this.init()
    // })

    events.subscribe('cards:changed', (userData) => {
      this.init()
    });

    this.init()
  }

  // ionViewWillLeave() {
  //   this.changes.cancel()
  // }

  init(callback = null) {
    this.db.all("card", {set_id: this.set._id}, (result) => {
      this.cards = result

      if (callback != null) {
        callback(this)
      }
      this.calcCardsCount()
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
            this.db.delete(card._id, () => {
              this.events.publish('cards:changed');
            })
          }
        }
      ]
    })
    confirm.present()
  }

  calcCardsCount() {
    this.cardsCount = this.cards.length
  }

  filterItems(that) {
    // if the value is an empty string don't filter the items
    if (that.searchTerm && that.searchTerm.trim() != '') {

      that.cards = that.cards.filter((item) => {
        if (item.front && item.back) {
          let front = item.front.toLowerCase()
          let back = item.back.toLowerCase()
          //console.log(`front: ${front} | back: ${back}`)
          //console.log('f index: ' + front.indexOf(that.searchTerm))
          //console.log('b index: ' + back.indexOf(that.searchTerm))

          return (front.indexOf(that.searchTerm) > -1) || (back.indexOf(that.searchTerm) > -1)
        }
      })
    }
  }

  searchItems(event) {
    // set val to the value of the searchbar
    if (event.target.value) {
      this.searchTerm = event.target.value.toLowerCase();
      console.log("Buscando " + this.searchTerm)

      this.init(this.filterItems)
    } else {
      this.init()
    }
  }

}
