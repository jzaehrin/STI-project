const express = require('express');
const router = express.Router();

const outbox = require('./outbox');
const inbox = require('./inbox');

const Crypto = require('../middleware/crypto');

const Database = require('better-sqlite3');
const db = new Database('/db/database.db');

process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));

/* Create new user. */
router.post('/', function(req, res, next) {
  res.send('creating new user');
});

/* Get user Profile. */
router.get('/:userId', function(req, res, next) {
  res.send('get the profile of user with id : ' + req.params.userId);
});

/* put user Profile. */
router.put('/:userId', function(req, res, next) {
  // if user is not admin, and tried to change role or validity, or tried to change other user's data, refuse
  console.log(req.body);
  if(req.role === 0 && (req.params.userId != req.user || req.body.hasOwnProperty('validity') || req.body.hasOwnProperty('level'))){
    res.sendStatus(401);
  }
  else{
    var somethingUpdated = false;
    if(req.body.hasOwnProperty('password') && req.body.password.hasOwnProperty('prev') && req.body.password.hasOwnProperty('new')){
        const stmt = db.prepare('SELECT digest_password FROM users WHERE id=?');
        const row = stmt.get(req.params.userId);

        if(!row || row.digest_password != Crypto.sha256(req.body.password.prev)){
            res.sendStatus(401);
            return;
        } else{
            const stmt = db.prepare('UPDATE users SET digest_password = ? WHERE id = ?'); 
            stmt.run(Crypto.sha256(req.body.password.new), req.params.userId);
            somethingUpdated = true;
        }
    }
    if(somethingUpdated){
        res.sendStatus(200);
    } else{
        res.sendStatus(400);
    }
  }
});

router.use('/:userId/outbox', function(req, res, next) {
  req.userId = req.params.userId;
  next()
}, outbox);

router.use('/:userId/inbox', function(req, res, next) {
  req.userId = req.params.userId;
  next()
}, inbox);

module.exports = router;
