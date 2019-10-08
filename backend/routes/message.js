const express = require('express');
const router = express.Router();

const db = require('../middleware/db');

/* Send new message. */
router.post('/', function (req, res, next) {

    // if any of the message properties are missing, BAD_REQUEST
    if (!req.body.hasOwnProperty('to') || !req.body.hasOwnProperty('subject') || !req.body.hasOwnProperty('message')) {
        res.sendStatus(400);
        return;
    }

    // if any of the message's properties' types are incorrect, BAD_REQUEST
    if (!Number.isInteger(req.body.to) || typeof req.body.subject != 'string' || typeof req.body.message != 'string') {
        res.sendStatus(400);
        return;
    }

    const stmt = db.prepare('INSERT INTO messages (`from`, `to`, timestamp, subject, message, read) VALUES (?, ?, ?, ?, ?, 0)');

    try {
        stmt.run(req.user, req.body.to, Math.round(new Date().getTime() / 1000), req.body.subject, req.body.message);
        res.sendStatus(200);
    } catch (error) {
        console.log(error)
        // if the transaction failed, we can assume the username was not unique, CONFILICT
        res.sendStatus(409);
    }
});

router.get('/:messageId', function (req, res, next) {
    // if message ID is not an int, BAD_REQUEST
    if (!Number.isInteger(parseInt(req.params.messageId))) {
        res.sendStatus(400);
        return;
    }
    let stmt = db.prepare(
      'SELECT m.id, `from` AS fromId, u1.username AS fromName, `to` AS toId, u2.username AS toName, timestamp, subject, read, message ' +
      'FROM messages AS m ' +
      'INNER JOIN users AS u1 ' +
      'ON u1.id = m.`from` ' +
      'INNER JOIN users u2 ' +
      'ON u2.id = m.`to` ' +
      'WHERE m.id=?');
    const message = stmt.get(req.params.messageId);

    // if the message doesn't exist, BAD_REQUEST
    if (!message) {
        res.sendStatus(400);
        return;
    }

    // if the user is not admin, and is neither from or to, UNAUTHORISED
    if (req.role == 0 && req.user !== message.fromId && req.user != message.toId) {
        res.sendStatus(401);
        return;
    }
    res.send(message);

});

router.put('/:messageId/read', function (req, res, next) {
    // if message ID is not an int, BAD_REQUEST
    if (!Number.isInteger(parseInt(req.params.messageId))) {
        res.sendStatus(400);
        return;
    }
    let stmt = db.prepare('SELECT * FROM messages WHERE id=?');
    let message = stmt.get(req.params.messageId);

    // if the message doesn't exist, BAD_REQUEST
    if (!message) {
        res.sendStatus(400);
        return;
    }

    // if the user is not admin, and is not to, UNAUTHORISED
    if (req.role == 0 && req.user != message.to) {
        res.sendStatus(401);
        return;
    }

    stmt = db.prepare('UPDATE messages SET read = 1 WHERE id=?');
    stmt.run(message.id);

    res.sendStatus(200);

});

module.exports = router;
