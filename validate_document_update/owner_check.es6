{
  "_id": "_design/owner_check",
  // use http://es6console.com/ to convert, copy as of `function..
  "validate_doc_update": `function(newDoc, oldDoc, userCtx) {
    if (userCtx.name == null) {
      throw({forbidden : '[CUSTOM VALIDATION] a user must be logged in'});
    }
    if (newDoc.user_id) {
      if (newDoc.user_id != ('org.couchdb.user:' + userCtx.name)) {
        throw({forbidden : '[CUSTOM VALIDATION] this document does not belong to you'});
      }
    } else {
      throw({forbidden : '[CUSTOM VALIDATION] this document does not have user_id'});
    }
  }`
}
