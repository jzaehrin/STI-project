const express = require('express');
const router = express.Router();

const db = require('../middleware/db');

/* Send new message. */
router.post('/', function(req, res, next) {
  res.send('send new message');
});

router.get('/:messageId', function (req, res, next) {
  // if message ID is not an int, BAD_REQUEST
  if(!Number.isInteger(parseInt(req.params.messageId))){
    res.sendStatus(400);
    return;
  }
  const stmt = db.prepare('SELECT * FROM messages WHERE id=?');
  const message = stmt.get(req.params.messageId);

  // if the message doesn't exist, BAD_REQUEST
  if(!message){
    res.sendStatus(400);
    return;
  }

  // if the user is not admin, and is neither from or to, UNAUTHORISED
  if(req.role == 0 && req.user !== message.from && req.user != message.to){
    res.sendStatus(401);
    return;
  }
  res.send(message);

});

router.put('/:messageId/read', function (req, res, next) {
  // if message ID is not an int, BAD_REQUEST
  if(!Number.isInteger(parseInt(req.params.messageId))){
    res.sendStatus(400);
    return;
  }
  let stmt = db.prepare('SELECT * FROM messages WHERE id=?');
  let message = stmt.get(req.params.messageId);

  // if the message doesn't exist, BAD_REQUEST
  if(!message){
    res.sendStatus(400);
    return;
  }

  // if the user is not admin, and is not to, UNAUTHORISED
  if(req.role == 0 && req.user != message.to){
    res.sendStatus(401);
    return;
  }

  stmt = db.prepare('UPDATE messages SET read = 1 WHERE id=?');
  stmt.run(message.id);

  res.sendStatus(200);

});

module.exports = router;
