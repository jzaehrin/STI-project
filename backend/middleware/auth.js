const Crypto = require('./crypto');

const db = require('./db');

module.exports = function (req, res, next) {
    if (!req.cookies.hasOwnProperty('Authorization')) {
        res.sendStatus(401);
        return;
    }

    let auth;
    try {
        const token = JSON.parse(Crypto.decrypt(JSON.parse(Buffer.from(req.cookies.Authorization, 'base64').toString('ascii'))));
        // cookie is still valid?
        auth = token.validity > Math.round(new Date().getTime() / 1000);

        // user is still active?
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(token.user);
        auth = user.active == 1 ? auth : false;

        // if user is authenticated, set trusted values in the request before passing it to the next router
        if (auth) {
            req.user = token.user;
            req.role = token.role;
        }
    } catch (error) {/*ignored*/
    }

    if (auth) {
        next();
    } else {
        res.sendStatus(401);
    }
}
