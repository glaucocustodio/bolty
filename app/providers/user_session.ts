import {Injectable} from '@angular/core';

@Injectable()
export class UserSession {
  current = {}

  constructor() {
  }

  set(value) {
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
