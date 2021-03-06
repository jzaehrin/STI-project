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
        !req.body.hasOwnProperty('last_name') || !req.body.hasOwnProperty('password') ||
        !req.body.hasOwnProperty('level') || !req.body.hasOwnProperty('active')) {
        res.sendStatus(400);
        return;
    }
    // if any of the user properties' types are incorrect, BAD_REQUEST
    if (typeof req.body.username != "string" || typeof req.body.first_name != "string" || typeof req.body.last_name != "string" ||
        typeof req.body.password != "string" || !Number.isInteger(req.body.level) || !Number.isInteger(req.body.active)) {
        res.sendStatus(400);
        return;
    }

    const stmt = db.prepare('INSERT INTO users (username, firstname, lastname, digest_password, level, active, deleted) VALUES (?, ?, ?, ?, ?, ?, 0)');

    try {
        stmt.run(req.body.username, req.body.first_name, req.body.last_name, Crypto.sha256(req.body.password), req.body.level, req.body.active);
        res.sendStatus(200);
    } catch (error) {
        // if the transaction failed, we can assume the username was not unique, CONFILICT
        res.sendStatus(409);
    }
});

/* Update user Profile. */
router.put('/:userId', function (req, res, next) {
    // if user is not admin, and tried to change role or validity, or tried to change other user's data, then UNAUTHORISED
    if (req.role === 0 && (req.params.userId !== req.user || req.body.hasOwnProperty('active') || req.body.hasOwnProperty('level'))) {
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

    if (req.body.hasOwnProperty('active')) {
        // if the active is wrong type, or poorly bounded, BAD_REQUEST
        if (!Number.isInteger(req.body.active) || req.body.active < 0 || req.body.active > 1) {
            res.sendStatus(400);
            return;
        }
        let stmt = db.prepare('UPDATE users SET active = ? WHERE id = ?');
        stmt.run(req.body.active, req.params.userId);
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

/* Soft-delete user Profile. */
router.delete('/:userId', function (req, res, next) {
    // if the user is not admin, UNAUTHORISED
    if (req.role === 0) {
        res.sendStatus(401);
        return;
    }
    const stmt = db.prepare('UPDATE users SET username = ?, deleted = 1 WHERE id = ?');
    // this sets the soft delete field to 1, and renames the username to free up the original username
    try {
        stmt.run("deleted_user_" + req.params.userId, req.params.userId);
    } catch (e) { // if there was an error, we can assume that the name "deleted_user_<id>" exists already, so we try again, but with a random username, until it works
        let deleted = false;
        while (!deleted) {
            const rand_id = Crypto.randomString();
            try {
                stmt.run('deleted_user_' + rand_id, req.params.userId);
                deleted = true;
            } catch (e) {/* ignored */}
        }
    }
    res.sendStatus(200);
});

/* Get user Profile. */
router.get('/:userId', function (req, res, next) {
    const stmt = db.prepare('Select * FROM users WHERE id = ?');
    const user = stmt.get(req.params.userId);

    // if the user doesn't exist, is deleted, or requester isn't an admin, and the account is disabled,BAD_REQUEST
    if(!user || user.deleted == 1 || (req.role == 0 && user.active == 0)){
        res.sendStatus(400);
        return;
    }

    // delete secret fields
    delete user.deleted;
    delete user.digest_password;

    res.send(user);
});

/* Get user outbox */
router.use('/:userId/outbox', function (req, res, next) {
    // if the user is not admin, and is trying to access someone else's outbox, UNAUTHORISED
    if (req.role === 0 && req.user != req.params.userId) {
        res.sendStatus(401);
        return;
    }
    req.userId = req.params.userId;
    next();
}, outbox);

/* Get user inbox */
router.use('/:userId/inbox', function (req, res, next) {
    // if the user is not admin, and is trying to access someone else's inbox, UNAUTHORISED
    if (req.role === 0 && req.user != req.params.userId) {
        res.sendStatus(401);
        return;
    }
    req.userId = req.params.userId;
    next();
}, inbox);

module.exports = router;
