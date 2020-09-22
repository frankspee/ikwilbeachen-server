const express = require('express');
const logger = require('morgan');
const mongoose = require("mongoose");
const config = (process.env.NODE_ENV === "production" ? require("./config.db") : require("./config.db.dev"));

const app = express();

//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
    .connect(config.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Database is connected");
    })
    .catch(err => {
        console.log({ database_error: err });
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

const activitiesRouter = require('./routes/activities');
app.use('/activities', activitiesRouter);

module.exports = app;