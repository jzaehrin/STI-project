const express = require('express');
const router = express.Router();

const outbox = require('./outbox');
const inbox = require('./inbox');

const Crypto = require('../middleware/crypto');
const db = require('../middleware/db');

/* Create new user. */
router.post('/', function (req, res, next) {
    if (req.role === 0) {
        res.sendStatus(401);
        return;
    }
    // if any of the user properties are missing, BAD_REQUEST
    if (!req.body.hasOwnProperty('username') || !req.body.hasOwnProperty('first_name') ||
        !req.body.hasOwnProperty('last_name') || !req.body.hasOwnProperty('password') || !req.body.hasOwnProperty('level')) {
        res.sendStatus(400);
        return;
    }
    // if any of the user properties' types are incorrect, BAD_REQUEST
    if (typeof req.body.username != "string" || typeof req.body.first_name != "string" || typeof req.body.last_name != "string" ||
        typeof req.body.password != "string" || !Number.isInteger(req.body.level)) {
        res.sendStatus(400);
        return;
    }

    const stmt = db.prepare('INSERT INTO users (username, firstname, lastname, digest_password, level, active) VALUES (?, ?, ?, ?, ?, 1)');

    try {
        stmt.run(req.body.username, req.body.first_name, req.body.last_name, Crypto.sha256(req.body.password), req.body.level);
        res.sendStatus(200);
    } catch (error) {
        // if the transaction failed, we can assume the username was not unique, CONFILICT
        res.sendStatus(409);
    }

});

/* Update user Profile. */
router.put('/:userId', function (req, res, next) {
    // if user is not admin, and tried to change role or validity, or tried to change other user's data, then UNAUTHORISED
    if (req.role === 0 && (req.params.userId !== req.user || req.body.hasOwnProperty('validity') || req.body.hasOwnProperty('level'))) {
        res.sendStatus(401);
        return;
    }
    let somethingUpdated = false;

    // if the password is being updated, the new (and old if not by an admin) password must be provided
    if (req.body.hasOwnProperty('password') && req.body.password.hasOwnProperty('new') && (req.role === 1 || req.body.password.hasOwnProperty('prev'))) {
        let stmt = db.prepare('SELECT digest_password FROM users WHERE id=?');
        const row = stmt.get(req.params.userId);
        // if the user doesn't exist or the existing password doesn't match, if not admin, then UNAUTHORISED
        if (!row || (req.role === 0 && row.digest_password !== Crypto.sha256(req.body.password.prev))) {
            res.sendStatus(401);
            return;
        }
        stmt = db.prepare('UPDATE users SET digest_password = ? WHERE id = ?');
        stmt.run(Crypto.sha256(req.body.password.new), req.params.userId);
        somethingUpdated = true;
    }

    if (req.body.hasOwnProperty('validity')) {
        // if the validity is wrong type, or poorly bounded, BAD_REQUEST
        if (!Number.isInteger(req.body.validity) || req.body.validity < 0 || req.body.validity > 1) {
            res.sendStatus(400);
            return;
        }
        let stmt = db.prepare('UPDATE users SET active = ? WHERE id = ?');
        stmt.run(req.body.validity, req.params.userId);
        somethingUpdated = true;
    }

    if (req.body.hasOwnProperty('level')) {
        // if the level is wrong type, or poorly bounded, BAD_REQUEST
        if (!Number.isInteger(req.body.level) || req.body.level < 0 || req.body.level > 1) {
            res.sendStatus(400);
            return;
        }
        let stmt = db.prepare('UPDATE users SET level = ? WHERE id = ?');
        stmt.run(req.body.level, req.params.userId);
        somethingUpdated = true;
    }

    if (somethingUpdated) {
        res.sendStatus(200);
    } else {
        // if nothing was updated, BAD_REQUEST
        res.sendStatus(400);
    }

});

/* Get user outbox */
router.use('/:userId/outbox', function (req, res, next) {
    // if the user is not admin, and is trying to access someone else's outbox, UNAUTHORISED
    if(req.role === 0 && req.user != req.params.userId){
        res.sendStatus(401);
        return;
    }
    req.userId = req.params.userId;
    next();
}, outbox);

/* Get user inbox */
router.use('/:userId/inbox', function (req, res, next) {
    // if the user is not admin, and is trying to access someone else's inbox, UNAUTHORISED
    if(req.role === 0 && req.user != req.params.userId){
        res.sendStatus(401);
        return;
    }
    req.userId = req.params.userId;
    next();
}, inbox);

module.exports = router;
