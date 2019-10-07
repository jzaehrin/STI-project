const express = require('express');
const router = express.Router();

const db = require('../middleware/db');

/* GET all users. */
router.get('/', function(req, res, next) {
  let stmt = db.prepare('SELECT id, username, firstname, lastname, level FROM users WHERE active = 1');
  const rows = stmt.all();
  res.send(rows);
});

module.exports = router;
