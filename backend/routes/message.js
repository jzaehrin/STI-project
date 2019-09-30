var express = require('express');
var router = express.Router();

/* Send new message. */
router.post('/', function(req, res, next) {
  res.send('send new message');
});

module.exports = router;
