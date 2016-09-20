import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DB} from '../../providers/db';

@Component({
  templateUrl: 'build/pages/memorization/memorization.html',
})
export class MemorizationPage {
  set: any;
  cards: any;
  activeCardIndex = 0;
  activeCard: any;
  showFront = true;

  constructor(private navCtrl: NavController, private navParams: NavParams, private db: DB) {
    this.set = navParams.get("set")

    this.db.all("card", {set_id: this.set._id}, (result) => {
      this.cards = result
      this.activeCard = this.cards[this.activeCardIndex]
      console.log(this.activeCard)
    })
  }

  onSwipeToLeft(e){
    console.log("swipe to left")
    if (this.activeCardIndex+1 < this.cards.length) {
      this.activeCardIndex += 1;
      this.activeCard = this.cards[this.activeCardIndex]
    }
  }

  onSwipeToRight(e){
    console.log("swipe to right")
    if (this.activeCardIndex > 0) {
      this.activeCardIndex -= 1;
      this.activeCard = this.cards[this.activeCardIndex]
    }
  }

  onTap(){
    this.showFront = !this.showFront
  }

  memorized(card){

  }

  notMemorized(card){
  }
}
