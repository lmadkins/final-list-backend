// BASIC CONFIG
const express = require('express');
const app = express();
// const cors = require('cors');
app.set('port', process.env.PORT || 8000);


// MIDDLEWARE
// Parses key value pairs in request
app.use(express.urlencoded({ extended: true }));
// Converts json strings to the an object and attaches it to req.body
app.use(express.json());
// Use cors package to allow connections from all domains
app.use(cors());

// request_logger.js in middleware folder
// Log each request as it comes in for debugging
const requestLogger = require('./middleware/request_logger');
app.use(requestLogger);

// Redirect any requests to the homepage
app.get('/', (req, res) => {
    res.redirect('/')
})

// CONTROLLERS
// Require the user resource routes and controllers
const userController = require('./controllers/usersController');
app.use('/users', userController);


// Require and use custom_errors.js in middleware folder
// The catch all for handling errors
const { handleErrors } = require('./middleware/custom_errors');
app.use(handleErrors);

// App.listen, start server
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get(
    'port')}`);
});