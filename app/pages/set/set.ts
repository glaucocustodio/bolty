import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import {NewSetPage} from '../new-set/new-set';

@Component({
  templateUrl: 'build/pages/set/set.html',
})
export class SetPage {

  constructor(private navCtrl: NavController, public modalCtrl: ModalController) {

  }

  openModal() {
    let modal = this.modalCtrl.create(NewSetPage);
    modal.present();
  }

}
