var express = require('express');
var router = express.Router();

/* get all sent massages of user */
router.get('/', function(req, res, next) {
  res.send('get all sent messages of user with id : ' + req.userId);
});
/* get sent message of user */
router.get('/:messageId', function(req, res, next) {
  res.send('get sent message with id : ' +  req.params.messageId +' of user with id : ' + req.userId);
});

module.exports = router;
