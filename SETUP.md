# App
- Install Node
- `npm install -g ionic@beta`
- `npm install -g gulp-cli`
- `npm install -g typings`
- `npm install -g add-cors-to-couchdb # may require sudo`
- `npm install`
- `add-cors-to-couchdb && ionic serve`

# Database
- Install Docker
- `docker pull klaemo/couchdb:2.0-single` (see more: https://goo.gl/rdrS63)
- Run CouchDB 2 container: `docker run -p 5984:5984 -v (pwd):/opt/couchdb/data klaemo/couchdb:2.0-single` on fish shell (replace `(pwd)` by `$(pwd)` in others shell)
- `curl -X PUT http://127.0.0.1:5984/_users`
- `curl -X PUT http://127.0.0.1:5984/bolty`
