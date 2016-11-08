import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';

@Injectable()
export class UserSession {
  storageKey = "loggedUser"
  constructor(public storage: Storage, public events: Events) {
  }

  set(value) {
    this.storage.set(this.storageKey, value);
    this.events.publish('user:login', value);
  }
  get() {
    return this.storage.get(this.storageKey)
  }
  remove() {
    this.storage.remove(this.storageKey)
  }
}
