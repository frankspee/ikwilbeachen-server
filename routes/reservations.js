var express = require('express');
var router = express.Router();

var _id = 0;
var _reservations = [];

/* GET reservations listing. */
router.get('/', function (req, res, next) {
  res.json(_reservations);
});

/* POST create a reservation. */
router.post('/', function (req, res, next) {
  let reservation = req.body;
  reservation.id = _id++;
  _reservations.unshift(reservation);
  // _reservations.sort(
  //   (a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()
  // );

  res.status(201).json(reservation);
});

/* DELETE a reservation. */
router.delete('/:id', function (req, res, next) {
  let id = parseInt(req.params.id);
  let index = _reservations.map(reservation => { return reservation.id }).indexOf(id);
  if (index === -1) {
    res.status(404).end();
  } else {
    _reservations.splice(index, 1);
    res.status(204).end();
  }
});

module.exports = router;