var express = require('express');
var router = express.Router();

var _id = 0;
var _activities = [];

/* GET activities listing. */
router.get('/', function (req, res, next) {
  let activities = _activities;
  res.json(activities);
});

/* POST create a activity. */
router.post('/', function (req, res, next) {
  let activity = req.body;
  activity.id = _id++;
  _activities.push(activity);
  res.status(201).json(activity);
});

/* PUT update a activity. */
router.put('/:id', function (req, res, next) {
  let id = parseInt(req.params.id);
  let activityToUpdate = _activities.find(i => i.id == id);
  
  if (!activityToUpdate) {
    res.status(404).end();
    return;
  }

  let activity = req.body;
  Object.assign(activityToUpdate, activity);
  res.status(204).end();
});

/* DELETE a activity. */
router.delete('/:id', function (req, res, next) {
  let id = parseInt(req.params.id);

  let index = _activities.findIndex(i => i.id == id);
  if (index === -1) {
    res.status(404).end();
    return;
  }

  let activityToDelete = _activities.find(i => i.id == id);
  let userId = req.header('x-user-id');
  if (activityToDelete && activityToDelete.creatorId !== userId) {
    res.status(403).send({ ci: activityToDelete.creatorId, ui: userId });
    return;
  }

  _activities.splice(index, 1);
  res.status(204).end();
});

module.exports = router;