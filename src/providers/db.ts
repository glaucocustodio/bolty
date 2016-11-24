import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {UserSession} from './user_session';

//import * as pouchdb from 'PouchDB'
//import PouchDB from 'pouchdb';
//import PouchDB from 'pouchdb-browser';
// import * as PouchDB from 'pouchdb'
// import PouchDB from 'pouchdb-browser';


@Injectable()
export class DB {
  private con: any
  private remoteCon: any

  constructor(public events: Events, public userSession: UserSession) {
    let PouchDB = require('pouchdb');
    PouchDB.plugin(require('pouchdb-authentication'));
    PouchDB.plugin(require('pouchdb-find'));
    //http://198.199.78.214
    const remoteDbBase = "http://198.199.78.214:5984"
    //const remoteDbBase = "http://127.0.0.1:5984"
    const remoteDbHost = `${remoteDbBase}/bolty`
    const remoteDB = new PouchDB(remoteDbHost);
    const local = new PouchDB('bolty_db_local');

    this.remoteCon = remoteDB
    this.con = local

    // workaround to create all databases automatically
    new PouchDB(`${remoteDbBase}/_users`).info()
    this.remoteCon.info()
    this.con.info()

    this.con.sync(this.remoteCon, {live: true, retry: true}).on("change", (c) => {
      console.log("mudou: " + c)
    })
  }

  loginUser(userData, onError, onSuccess) {
    console.log("logging..")

    this.remoteCon.login(userData['username'], userData['password']).then((response) => {
      this.remoteCon.getUser(userData['username']).then((response) => {
        this.userSession.set(response)
        onSuccess(response)
      })

    }).catch((err, response) => {
      onError(err, response)
    })
  }

  logoutUser() {
    this.events.publish('user:logout');
    this.remoteCon.logout().then((response) => {})
  }

  signupUser(userData, onError, onSuccess) {
    console.log("singing up...")
    console.log(userData)

    this.remoteCon.signup(userData['username'], userData['password']).then((response) => {
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

  deleteAll(type, filters = {}) {
    this.con.all(type, filters, (docs) => {
      console.log("deleteAll")
      console.log(docs)
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
