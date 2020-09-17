const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const ActivitySchema = new Schema({
    id: ObjectId,
    startDateTime: Date,
    endDateTime: Date,
    attendees: Array,
    creatorId: Number
});

const Activity = mongoose.model("Activity", ActivitySchema);
module.exports = Activity;