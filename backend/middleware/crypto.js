// TAKEN FROM https://codeforgeek.com/encrypt-and-decrypt-data-in-node-js/

// Nodejs encryption with CTR 

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

var fs = require('fs');

var key;

fs.readFile('./server.key', 'utf8', function (err, data) {
    if (err) throw err;
    key =data.toString();
});


const iv = crypto.randomBytes(16);

function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
 let iv = Buffer.from(text.iv, 'hex');
 let encryptedText = Buffer.from(text.encryptedData, 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}

function sha256(text){
 return crypto.createHash('sha256').update(text, 'utf8').digest('hex')
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.sha256 = sha256;

