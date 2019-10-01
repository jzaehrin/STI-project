const Crypto = require('./crypto');

module.exports = function (req, res, next){
   // check auth)
    
    var auth = false;
    if(typeof req.cookies.token !== 'undefined'){
        try{
            token = JSON.parse(Crypto.decrypt(JSON.parse(Buffer.from(req.cookies.token, 'base64').toString('ascii'))));
            // cookie is still valid
            auth = token.validity > Math.round(new Date().getTime() / 1000);
            if(auth){
                req.user = token.user;
                req.role = token.role;
            }
            console.log(token);
        } catch(error){/*ignored*/}
    }
    if (auth){
        next();
    }
    else{
        res.sendStatus(401)
    }
}
