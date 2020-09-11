var express = require('express');
var router = express.Router();

var _id = 0;
var _reservations = [];

/* GET reservations listing. */
router.get('/', function (req, res, next) {
  res.json(_reservations);
  // TODO: add backend sorting?
  // _reservations.sort(
  //   (a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()
  // );
});

/* POST create a reservation. */
router.post('/', function (req, res, next) {
  let reservation = req.body;
  reservation.id = _id++;
  _reservations.push(reservation);
  res.status(201).json(reservation);
});

/* PUT update a reservation. */
router.put('/:id', function (req, res, next) {
  let id = parseInt(req.params.id);
  let index = _reservations.map(reservation => { return reservation.id }).indexOf(id);
  if (index === -1) {
    res.status(404).end();
  } else {
    // TODO: improve this remove / add functionality to an edit one!!
    _reservations.splice(index, 1);

    let reservation = req.body;
    _reservations.unshift(reservation);

    res.status(204).end();
  }
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