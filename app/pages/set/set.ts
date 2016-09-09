import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {NewSetPage} from '../new-set/new-set';
import {DB} from '../../db';

@Component({
  templateUrl: 'build/pages/set/set.html',
})
export class SetPage {
  sets: any;

  constructor(private navCtrl: NavController, public modalCtrl: ModalController) {
    DB.all("set", (result) => {
      this.sets = result.rows
      console.log(result)
    })
  }

  openModal() {
    let modal = this.modalCtrl.create(NewSetPage);
    modal.present();
  }

  enter(set) {

  }

}
