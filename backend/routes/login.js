var express = require('express');
var router = express.Router();
var Database = require('better-sqlite3');
var db = new Database('./db/database.db');

var Crypto = require('../middleware/crypto');

/* Send new message. */
router.post('/', function(req, res, next) {
  if (typeof req.body.user !== 'undefined' && typeof req.body.password !== 'undefined'){
    var stmt = db.prepare('SELECT * FROM users WHERE username=?');
    var row = stmt.get(req.body.user);

    if(!row || row.digest_password != req.body.password){
        res.sendStatus(401);
    } else{
        let session = {};
        session.user = row.id;
        session.role = row.level;
        // 24 hour validity
        session.validity = Math.round(new Date().getTime() / 1000) + 24 * 60 * 60;

        let cookie = Crypto.encrypt(JSON.stringify(session));
        cookie.user_id = row.id;

        encCookie = Buffer.from(JSON.stringify(cookie)).toString('base64');
        res.cookie("Authorization", encCookie).sendStatus(200);
    }
  } else {
    res.sendStatus(401);
  }

});

module.exports = router;
