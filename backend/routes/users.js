const express = require('express');
const router = express.Router();

const db = require('../middleware/db');

/* GET all users. */
router.get('/', function (req, res, next) {

    const stmt = db.prepare('SELECT id, username, firstname, lastname, level, active FROM users' + req.role === 0 ? "WHERE active = 1" : "");
    const rows = stmt.all();
    res.send(rows);
});

module.exports = router;
