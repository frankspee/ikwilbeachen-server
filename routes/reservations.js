var express = require('express');
var router = express.Router();

var _id = 0;
var _reservations = [];

/* GET reservations listing. */
router.get('/', function (req, res, next) {
  let activities = _reservations;
  res.json(activities);
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
  let activityToUpdate = _reservations.find(i => i.id == id);
  
  if (!activityToUpdate) {
    res.status(404).end();
    return;
  }

  let activity = req.body;
  Object.assign(activityToUpdate, activity);
  res.status(204).end();
});

/* DELETE a reservation. */
router.delete('/:id', function (req, res, next) {
  let id = parseInt(req.params.id);

  let index = _reservations.findIndex(i => i.id == id);
  if (index === -1) {
    res.status(404).end();
    return;
  }

  let activityToDelete = _reservations.find(i => i.id == id);
  let userId = req.header('x-user-id');
  if (activityToDelete && activityToDelete.creatorId !== userId) {
    res.status(403).send({ ci: activityToDelete.creatorId, ui: userId });
    return;
  }

  _reservations.splice(index, 1);
  res.status(204).end();
});

module.exports = router;