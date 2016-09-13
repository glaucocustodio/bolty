import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {NewSetPage} from '../new-set/new-set';
import {CardPage} from '../card/card';
import {DB} from '../../db';

@Component({
  templateUrl: 'build/pages/set/set.html',
})
export class SetPage {
  sets: any;

  constructor(private navCtrl: NavController, public modalCtrl: ModalController) {
    DB.con().changes({
      since: 'now',
      live: true,
    }).on('change', (_change) => {
      this.getSets()
    })

    this.getSets()
  }

  getSets() {
    DB.all("set", {}, (result) => {
      this.sets = result
      console.log(result)
    })
  }

  openModal() {
    let modal = this.modalCtrl.create(NewSetPage);
    modal.present();
  }

  enter(set) {
    this.navCtrl.push(CardPage, { set: set });
  }

}
