import {Injectable} from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class DB {
  private con: any

  constructor(public events: Events) {
    let PouchDB = require('pouchdb');
    PouchDB.plugin(require('pouchdb-authentication'));
    PouchDB.plugin(require('pouchdb-find'));

    const remoteDbHost = "http://127.0.0.1:5984/bolty"
    const db = new PouchDB(remoteDbHost)
    const local = new PouchDB('bolty_db_local');

    //local.sync(db, {live: true, retry: true})
    //local.sync(db, {live: true, retry: true})//.on('error', console.log.bind(console));

    this.con = db
  }

  loginUser(userData, onError, onSuccess) {
    console.log("logging..")
    console.log(userData)

    this.con.login(userData['username'], userData['password']).then((response) => {
      this.con.getUser(userData['username']).then((response) => {

        onSuccess(response)
      })

    }).catch((err, response) => {
      onError(err, response)
    })
  }

  signupUser(userData, onError, onSuccess) {
    console.log("singing up...")
    console.log(userData)

    this.con.signup(userData['username'], userData['password']).then((response) => {
      onSuccess(response)
    }).catch((err, response) => {
      onError(err, response)
    })
  }

  put(type, obj) {
    console.log(`putting ${type}...`)

    obj = Object.assign(
      obj,
      {
        _id: `${type}-${new Date().toISOString()}`,
        type: type
      }
    )

    console.log(obj)

    this.con.put(obj).then((resp) => {
      console.log("success " + resp)
    }).catch((err) => {
      console.log(`Failed to put ${type} ` + err)
    });
  }

  all(type, filters = {}, onSuccess) {
    this.con.find({
      selector: Object.assign({type: type}, filters)
    }).then((result) => {
      onSuccess(result.docs)
    })
  }

  delete(_id) {
    this.con.get(_id).then((doc) => {
      return this.con.remove(doc)
    })
  }

  onChanges(onSuccess) {
    this.con.changes({
      since: 'now',
      live: true,
    }).on('change', (changes) => {
      onSuccess(changes)
    })
  }


}
