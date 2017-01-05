import {Injectable} from '@angular/core';
import {Events} from 'ionic-angular';
import {UserSession} from './user_session';
import {GUID} from '../helpers/guid';


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
    // The remote databases must be created manually!
    // After creating the dbs, access Fauxon and go to: Permissions -> Members -> Add Role and type "admin"
    // only members with role "admin" will be able to change the db through Fauxton
    //http://198.199.78.214
    const remoteDbBase = "http://198.199.78.214:5984"
    //const remoteDbBase = "http://127.0.0.1:5984"
    const remoteDbHost = `${remoteDbBase}/bolty`

    let options = {
      skipSetup: true,
    }

    const remoteDB = new PouchDB(remoteDbHost, options);
    const local = new PouchDB('bolty_db_local');

    this.remoteCon = remoteDB
    this.con = local

    // workaround to create all databases automatically
    // new PouchDB(`${remoteDbBase}/_users`).info()
    // this.remoteCon.info()
    // this.con.info()

    this.con.sync(this.remoteCon, {
      live: true,
      retry: true
    })
    // .on("change", (c) => {
    //   console.log("changed: ")
    //   // console.log(c)
    // }).on('paused', function (info) {
    //   console.log("paused: " + info)
    // }).on('active', function (info) {
    //   console.log("on active: ")
    //   // console.log(info)
    // }).on('error', function (err) {
    //   console.log("error: " + err)
    //   // totally unhandled error (shouldn't happen)
    // });
  }

  loginUser(userData, onError, onSuccess) {
    console.log("logging..")
    console.log(userData)

    this.remoteCon.login(userData['username'], userData['password']).then((response) => {
      this.remoteCon.getUser(userData['username']).then((response) => {
        this.userSession.set(response).then(() => {
          onSuccess(response)
        })
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

    this.con.put(this.prepareForSave(type, obj)).then((resp) => {
      console.log("Success to put " + resp)
    }).catch((err) => {
      console.log(err)
      console.log(`Failed to put ${type} ` + err)
    });
  }

  private prepareForSave(type, object) {
    return Object.assign(
      object,
      {
        _id: `${type}-${new Date().toISOString()}-${GUID.generate()}`,
        type: type
      }
    )
  }

  putAll(type, documents) {
    console.log("putting all " + type)

    let documentsReady = documents.map((current) => {
      return this.prepareForSave(type, current)
    })
    return this.con.bulkDocs(documentsReady)
  }

  update(type, obj) {
    obj = Object.assign(
      obj,
      {
        type: type
      }
    )
    this.con.put(obj).then((resp) => {
      console.log("Success to update " + resp)
    }).catch((err) => {
      console.log(err)
      console.log(`Failed to update ${type} ` + err)
    });
  }

  updateAll(type, filters = {}, toChange) {
    console.log("updateAll " + type)

    this.all(type, filters, (result) => {
      let changed = result.map((current) => {
        return Object.assign(current, toChange)
      })
      this.con.bulkDocs(changed)
    })
  }

  all(type, filters = {}, onSuccess) {
    this.con.find({
      selector: Object.assign({ type: type }, filters)
    }).then((result) => {
      onSuccess(result.docs)
    })
  }

  delete(_id, onSuccess = null) {
    this.con.get(_id).then((doc) => {
      this.con.put(Object.assign(doc, { _deleted: true })).then(() => {
        console.log("deleted")
        if (onSuccess) onSuccess()
      })
    })
  }

  deleteAll(type, filters = {}, onSuccess = () => {}) {
    this.all(type, filters, (docs) => {
      console.log(`deleteAll ${type}`)
      let documentsReady = docs.map((current) => {
        return Object.assign(current, { _deleted: true })
      })

      this.con.bulkDocs(documentsReady, {}, onSuccess)
    })
  }

  onChanges(type = null, onSuccess) {
    console.log("onChanges called")
    let options;

    if (type) {
      options = {
        since: 'now',
        live: true,
        filter: 'filter_by_type',
        query_params: {type: type}
      }
    } else {
      options = {
        since: 'now',
        live: true,
      }
    }

    return this.con.changes(options).on('change', function(change) {
      console.log("cc")
      onSuccess()
    }).on('error', function (err) {
      console.log("changes error")
      console.log(err);
    });
  }
}
