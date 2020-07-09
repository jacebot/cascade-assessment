require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const basicAuth = require('_helpers/basic-auth');
const errorHandler = require('_helpers/error-handler');

const userEventLog = require('./_helpers/userEventLogger')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use basic HTTP auth to secure the api
app.use(basicAuth);

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

// Init or reset the log to empty
//userEventLog.reset()

// Query day before
console.log('Query all events', userEventLog.getEvents())

// Query day before
console.log('Query day before', userEventLog.dateQuery(2))

// Query week before
console.log('Query week before, no timeout', userEventLog.dateQuery(14, 7, true))
