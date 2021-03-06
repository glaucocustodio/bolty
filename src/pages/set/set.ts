import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, Events } from 'ionic-angular';
import {NewSetPage} from '../new-set/new-set';
import {CardPage} from '../card/card';
import { ImportCardPage } from '../import-card/import-card';
import {MemorizationPage} from '../memorization/memorization';
import {DB} from '../../providers/db';
import {UserSession} from '../../providers/user_session';

@Component({
  templateUrl: 'set.html',
})
export class SetPage {
  sets: any;
  userId: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public userSession: UserSession, public db: DB, public alertCtrl: AlertController, public events: Events) {
  }

  ngOnInit() {
    this.events.subscribe('sets:changed', (userData) => {
      this.getSets()
    });
  }

  ionViewWillEnter() {
    this.getSets()
  }

  getSets() {
    this.userSession.get().then((response) => {
      this.userId = response["_id"]

      this.db.all("set", { user_id: this.userId }, (result) => {
        this.sets = result
      })
    })

  }

  openModal() {
    let modal = this.modalCtrl.create(NewSetPage, { user_id: this.userId });
    modal.present();
  }

  delete(set) {
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
            this.db.delete(set._id, () => {
              this.events.publish('sets:changed');
              this.db.deleteAll("card", { set_id: set._id })
            })
            // this.db.deleteAll("card", { set_id: set._id }, () => {
            //   this.db.delete(set._id)
            // })
          }
        }
      ]
    })
    confirm.present()
  }

  import(set) {
    this.navCtrl.push(ImportCardPage, { set: set });
  }

  enter(set) {
    this.navCtrl.push(CardPage, { set: set });
  }

  memorize(set) {
    this.navCtrl.push(MemorizationPage, { set: set });
  }

  reset(set) {
    this.db.updateAll('card', {set_id: set._id}, {memorized: false})
  }

}
