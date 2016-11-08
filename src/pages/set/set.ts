import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {NewSetPage} from '../new-set/new-set';
import {CardPage} from '../card/card';
import {MemorizationPage} from '../memorization/memorization';
import {DB} from '../../providers/db';
import {UserSession} from '../../providers/user_session';

@Component({
  templateUrl: 'set.html',
})
export class SetPage {
  sets: any;
  userId: string;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public userSession: UserSession, public db: DB) {
    this.db.onChanges((_changes) => {
      this.getSets()
    })

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
