import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class UserSession {
  current = {}

  constructor(public storage: Storage) {
  }

  set(value) {
    this.storage.set('hasUserLogged', value["name"]);
    this.current = value
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
