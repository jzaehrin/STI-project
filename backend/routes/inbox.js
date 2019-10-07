const express = require('express');
const router = express.Router();

const db = require('../middleware/db');

/* get all received massages of user (user authorisation assumed valid) */
router.get('/', function(req, res, next) {
  let stmt = db.prepare(
      'SELECT m.id, `from` AS fromId, u1.username AS fromName, `to` AS toId, u2.username AS toName, timestamp, subject, read ' +
      'FROM messages AS m ' +
      'INNER JOIN users AS u1 ' +
      'ON u1.id = m.`from` ' +
      'INNER JOIN users u2 ' +
      'ON u2.id = m.`to` ' +
      'WHERE m.`to`=?');
  const rows = stmt.all(req.userId);
  res.send(rows);
});

module.exports = router;
