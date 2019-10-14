const express = require('express');
const router = express.Router();

const db = require('../middleware/db');
const Crypto = require('../middleware/crypto');

/* Send new message. */
router.post('/', function (req, res, next) {
    // if the user or password fields are missing, BAD_REQUEST
    if (!req.body.hasOwnProperty('user') || !req.body.hasOwnProperty('password')) {
        res.sendStatus(400);
        return
    }

    const stmt = db.prepare('SELECT * FROM users WHERE username=?');
    const user = stmt.get(req.body.user);

    // if the user is not found, the user is disabled or deleted or the passwords doesn't match, UNAUTHORISED
    if (!user || user.active == 0 || user.deleted == 1 || user.digest_password !== Crypto.sha256(req.body.password)) {
        res.sendStatus(401);
        return;
    }
    let session = {};
    session.user = user.id;
    session.role = user.level;
    // 24 hour validity
    session.validity = Math.round(new Date().getTime() / 1000) + 24 * 60 * 60;

    let cookie = Crypto.encrypt(JSON.stringify(session));
    cookie.user_id = user.id;
    cookie.level = user.level;

    const encCookie = Buffer.from(JSON.stringify(cookie)).toString('base64');
    res.cookie("Authorization", encCookie, {expires: new Date(Date.now() + 24 * 60 * 60 * 1000)}).sendStatus(200);

});

module.exports = router;
