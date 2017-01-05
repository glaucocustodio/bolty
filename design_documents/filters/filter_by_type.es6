{
  "_id": "_design/filter_by_type",
  // use http://es6console.com/ to convert, copy as of `function..
  "filters": {
    "filter_by_type": `function (doc, req) {
      return doc.type === req.query.type;
    }`
  }
}
