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

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public userSession: UserSession, public db: DB) {
    this.db.onChanges((_changes) => {
      this.getSets()
    })

    this.getSets()
  }

  getSets() {
    this.db.all("set", {user_id: this.userSession.get()["_id"]}, (result) => {
      this.sets = result
      console.log(result)
    })
  }

  openModal() {
    let modal = this.modalCtrl.create(NewSetPage, {user_id: this.userSession.get()["_id"]});
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