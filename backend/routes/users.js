var express = require('express');
var router = express.Router();

/* GET all users. */
router.get('/', function(req, res, next) {
  res.send('print_user_list');
});

module.exports = router;
