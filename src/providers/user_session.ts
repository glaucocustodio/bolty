import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Events} from 'ionic-angular';

@Injectable()
export class UserSession {
  storageKey = "loggedUser"
  constructor(public storage: Storage, public events: Events) {
  }

  set(value) {
    return new Promise((resolve, reject) => {
      this.storage.set(this.storageKey, value).then(()=> {
        this.events.publish('user:login', value);
        resolve()
      });
    });
  }
  get() {
    return this.storage.get(this.storageKey)
  }
  remove() {
    this.storage.remove(this.storageKey)
  }
}
