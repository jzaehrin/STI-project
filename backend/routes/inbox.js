var express = require('express');
var router = express.Router();

/* get all received massages of user */
router.get('/', function(req, res, next) {
  res.send('get all received messages of user with id : ' + req.userId);
});

/* get received message of user */
router.get('/:messageId', function(req, res, next) {
  res.send('get received message with id : ' +  req.params.messageId +' of user with id : ' + req.userId);
});

module.exports = router;
