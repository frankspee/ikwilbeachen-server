const express = require('express');
const router = express.Router();
const Activity = require("../models/Activity");

/* GET activities listing. */
router.get('/', function (req, res, next) {
  Activity.find({}, function (err, result) {
    if (err) {
      res.status(500).send(err);
      throw err;
    }
    res.json(result);
  });
});

/* GET activity. */
router.get('/:id', function (req, res, next) {
  let id = req.params.id;

  Activity.findOne({ '_id': id }, function (err, result) {
    if (err) {
      res.status(500).send(err);
      throw err;
    }

    console.log(result);

    if (result == null) {
      res.status(404).end();
      return;
    }

    res.json(result);
  });
});

/* POST create a activity. */
router.post('/', async function (req, res, next) {

  const activity = new Activity({
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    attendees: req.body.attendees,
    creatorId: req.body.creatorId
  });

  // TODO: add database error handling
  await activity.save();

  res.status(201).json(activity);
});

/* PUT update a activity. */
router.put('/:id', function (req, res, next) {
  let id = req.params.id;
  let activity = req.body;

  Activity.updateOne({ '_id': id }, activity, function (err, result) {
    if (err) {
      res.status(500).send(err);
      throw err;
    }

    console.log(result);

    if (result == null) {
      res.status(404).end();
      return;
    }

    res.status(204).end();
  });
});

/* DELETE a activity. */
router.delete('/:id', function (req, res, next) {
  let id = req.params.id;
  let userId = req.header('x-user-id');

  Activity.deleteOne({ '_id': id, 'creatorId': userId }, function (err, result) {
    if (err) {
      res.status(500).send(err);
      throw err;
    }

    console.log(result);

    if (result.deletedCount == 0) {
      // TODO: could add a 403 when creatorId is not right.
      res.status(404).end();
      return;
    }

    res.status(204).end();
  });
});

module.exports = router;