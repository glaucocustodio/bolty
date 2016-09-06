let PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-authentication'));

let instance = null

export class DB {
  constructor() {
    if (instance == null) {
      instance = new PouchDB("bolty_db")
    }

    return instance
  }

  static con(){
    const remoteDbHost = "http://127.0.0.1:5984/bolty"
    const db = new PouchDB(remoteDbHost, {skipSetup: true})

    // var local = new PouchDB('bolty_db_local');
    // local.sync(db, {live: true, retry: true}).on('error', console.log.bind(console));

    return db
  }

  static loginUser(userData, onError) {
    console.log(userData)
    // console.log(err)
    // console.log(response)

    DB.con().login(userData['username'], userData['password'], function(err, response) {
      onError(err, response)
    })
  }
}
