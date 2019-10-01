var express = require('express');
var router = express.Router();
var outbox = require('./outbox');
var inbox = require('./inbox');

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

router.use('/:userId/outbox', function(req, res, next) {
  req.userId = req.params.userId;
  next()
}, outbox);

router.use('/:userId/inbox', function(req, res, next) {
  req.userId = req.params.userId;
  next()
}, inbox);

module.exports = router;
