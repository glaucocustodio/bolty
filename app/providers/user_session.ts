import {Injectable} from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class UserSession {
  current = {}

  constructor(public events: Events) {
  }

  set(value) {
    console.log(typeof value)
    this.current = value
    this.events.publish('user:login');
  }
  get() {
    return this.current
  }
  // setVal(key, value) {
  //   console.log('setVal called')
  //   this.shareable[key] = value
  // }

  // getVal(key) {
  //   console.log('getVal called')
  //   console.log(this.shareable)
  //   return this.shareable[key]
  // }
}
