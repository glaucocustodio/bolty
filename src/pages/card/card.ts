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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController, public db: DB, public events: Events) {
  }

  ngOnInit() {
    this.set = this.navParams.get("set")

    this.events.subscribe('cards:changed', (userData) => {
      this.init()
    });
  }

  ionViewWillEnter() {
    this.init()
  }

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

  searchItems(event) {
    // set val to the value of the searchbar
    if (event.target.value) {
      this.searchTerm = event.target.value.toLowerCase();
      console.log("Buscando " + this.searchTerm)

      this.db.all("card", {
        $or: [
          { front: { $regex: `.*?${this.searchTerm}.*?` } },
          { back: { $regex: `.*?${this.searchTerm}.*?` } }
        ]
      }, (result) => {
        this.cards = result
        this.calcCardsCount()
      })
    } else {
      this.init()
    }
  }

}
