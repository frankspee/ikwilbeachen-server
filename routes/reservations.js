var express = require('express');
var router = express.Router();

/* GET reservations listing. */
router.get('/', function(req, res, next) {
  res.send({});
});

module.exports = router;
