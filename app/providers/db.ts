import {Injectable} from '@angular/core';
import { Events } from 'ionic-angular';

@Injectable()
export class DB {
  private con: any

  constructor(private events: Events) {
    let PouchDB = require('pouchdb');
    PouchDB.plugin(require('pouchdb-authentication'));
    PouchDB.plugin(require('pouchdb-find'));

    const remoteDbHost = "http://127.0.0.1:5984/bolty"
    const remoteDB = new PouchDB(remoteDbHost)
    const local = new PouchDB('bolty_db_local');

    //local.sync(db, {live: true, retry: true})
    //local.sync(db, {live: true, retry: true})//.on('error', console.log.bind(console));

    this.con = remoteDB
  }

  loginUser(userData, onError, onSuccess) {
    console.log("logging..")
    console.log(userData)

    this.con.login(userData['username'], userData['password']).then((response) => {
      this.con.getUser(userData['username']).then((response) => {
        this.events.publish('user:login');
        onSuccess(response)
      })

    }).catch((err, response) => {
      onError(err, response)
    })
  }

  logoutUser() {
    this.con.logout().then((response) => {
      this.events.publish('user:logout');
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

  get(doc) {
    this.con.get(doc._id).then((doc) => {
      console.log(doc)
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
      console.log("Success to put " + resp)
    }).catch((err) => {
      console.log(err)
      console.log(`Failed to put ${type} ` + err)
    });
  }

  update(type, obj) {
    obj = Object.assign(
      obj,
      {
        type: type
      }
    )
    console.log(obj)
    this.con.put(obj).then((resp) => {
      console.log("Success to update " + resp)
    }).catch((err) => {
      console.log(err)
      console.log(`Failed to update ${type} ` + err)
    });
  }

  updateAll(type, filters = {}, toChange) {
    console.log("updateAll " + type)
    //console.log(filters)
    this.all(type, filters, (result) => {
      let changed = result.map((c) => {
        //console.log(c)
        return Object.assign(
          c,
          toChange
        )
      })
      console.log(changed)
      this.con.bulkDocs(changed)
      // .then(() => {
      //   console.log("sucesso")
      // })
    })
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
