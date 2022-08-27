const express = require('express');
const User = require('../models/User');

const router = express.Router();





// GET show a user's info 
// /users/:id

// PATCH update a user's info 
// /users/:id
// then redirect to GET /users/:id

// DELETE a user
// /users/:id
// then redirect to home, logged out


// SIGN UP
// POST create a new user 
// /users/signup
// then redirect to /lists
router.post('/signup', (req, res, next) => {
	User.create(req.body)
		.then((user) => res.status(201).json(user))
		.catch(next);
});

// LOGIN
// POST login 
// /users/login
// then redirect to /lists
router.post('/login', (req, res, next) => {});


module.exports = router;
