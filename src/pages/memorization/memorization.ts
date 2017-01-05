import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DB} from '../../providers/db';

@Component({
  templateUrl: 'memorization.html',
})
export class MemorizationPage {
  set: any;
  cards = [];
  activeCardIndex = 0;
  activeCard: any;
  showFront = true;
  showResults = false;
  memorizedCards = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DB) {
  }

  ngOnInit(){
    this.set = this.navParams.get("set")

    this.db.all("card", { set_id: this.set._id, memorized: false }, (result) => {
      this.cards = result
      this.activeCard = this.cards[this.activeCardIndex]
    })
  }

  onSwipeToLeft(e){
    console.log("swipe to left")
    // if (this.activeCardIndex+1 < this.cards.length) {
    //   this.activeCardIndex += 1;
    //   this.activeCard = this.cards[this.activeCardIndex]
    // }
    this.flipCard()
  }

  onSwipeToRight(e){
    console.log("swipe to right")
    // if (this.activeCardIndex > 0) {
    //   this.activeCardIndex -= 1;
    //   this.activeCard = this.cards[this.activeCardIndex]
    // }
    this.flipCard()
  }

  onTap(){
    this.flipCard()
  }

  memorized(card){
    console.log("memorized")

    this.memorizedCards += 1

    let obj = Object.assign(
      card,
      { memorized: true }
    )
    this.db.update("card", obj)
    this.showNextCard()
  }

  notMemorized(card){
    console.log("not memorized")

    this.showNextCard()
  }

  flipCard() {
    this.showFront = !this.showFront
  }

  showNextCard() {
    if (this.activeCardIndex+1 < this.cards.length) {
      this.activeCardIndex += 1;
      this.activeCard = this.cards[this.activeCardIndex]
    } else {
      this.showResults = true
    }
  }
}
