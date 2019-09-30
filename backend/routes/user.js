var express = require('express');
var router = express.Router();

/* Create new user. */
router.post('/', function(req, res, next) {
  res.send('creating new user');
});

/* Get user Profile. */
router.get('/:userId', function(req, res, next) {
  res.send('get the profile of user with id : ' + req.params.userId);
});

/* put user Profile. */
router.put('/:userId', function(req, res, next) {
  res.send('update the profile of user with id : ' + req.params.userId);
});

/* get all received massages of user */
router.get('/:userId/inbox', function(req, res, next) {
  res.send('get all received messages of user with id : ' + req.params.userId);
});

/* get received message of user */
router.get('/:userId/inbox/:messageId', function(req, res, next) {
  res.send('get sent message with id : ' +  req.params.messageId +' of user with id : ' + req.params.userId);
});

/* get all sent massages of user */
router.get('/:userId/outbox', function(req, res, next) {
  res.send('get all received messages of user with id : ' + req.params.userId);
});
/* get sent message of user */
router.get('/:userId/outbox/:messageId', function(req, res, next) {
  res.send('get sent message with id : ' +  req.params.messageId +' of user with id : ' + req.params.userId);
});

module.exports = router;
