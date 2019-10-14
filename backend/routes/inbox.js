const express = require('express');
const router = express.Router();

const db = require('../middleware/db');

/* get all received massages of user (user authorisation assumed valid) */
router.get('/', function(req, res, next) {
  let stmt = db.prepare(
      'SELECT m.id, `from` AS fromId, u1.username AS fromName, u1.deleted AS fromDel, `to` AS toId, u2.username AS toName, u2.deleted AS toDel, timestamp, subject, read ' +
      'FROM messages AS m ' +
      'INNER JOIN users AS u1 ' +
      'ON u1.id = m.`from` ' +
      'INNER JOIN users u2 ' +
      'ON u2.id = m.`to` ' +
      'WHERE m.`to`=?');
  let rows = stmt.all(req.userId);

  rows = rows.map(function (row) {
    row.fromName = row.fromDel == 0 ? row.fromName : "<Deleted User>";
    row.toName = row.toDel == 0 ? row.toName : "<Deleted User>";
    delete row.fromDel;
    delete row.toDel;
    return row;
  });
  res.send(rows);
});

module.exports = router;
