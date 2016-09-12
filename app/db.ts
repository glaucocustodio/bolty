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
    //, {skipSetup: true}
    const db = new PouchDB(remoteDbHost)
    db.info() // automatically creates the database

    const local = new PouchDB('bolty_db_local');
    //local.sync(db, {live: true, retry: true})
    //local.sync(db, {live: true, retry: true})//.on('error', console.log.bind(console));

    return db
  }

  static loginUser(userData, onError) {
    console.log("logging..")
    console.log(userData)

    DB.con().login(userData['username'], userData['password']).catch(function(err, response) {
      onError(err, response)
    })
  }

  static signupUser(userData, onError, onSuccess) {
    console.log("singing up...")
    console.log(userData)

    DB.con().signup(userData['username'], userData['password']).then(function(response){
      onSuccess(response)
    }).catch(function(err, response) {
      onError(err, response)
    })
  }

  static put(type, obj) {
    console.log(`putting ${type}...`)

    obj = Object.assign(
      obj,
      {
        _id: `${type}-${new Date().toISOString()}`,
        type: type
      }
    )

    console.log(obj)

    DB.con().put(obj).then((resp) => {
      console.log("success " + resp)
    }).catch((err) => {
      console.log(`Failed to put ${type} ` + err)
    });
  }

  static all(type, onSuccess) {
    DB.con().allDocs({
      include_docs: true,
      //descending: true,
      startkey: type,
      endkey: `${type}\uffff`
    }).then((result) => {
      onSuccess(result)
    })
  }
}
