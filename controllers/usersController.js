const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createUserToken } = require('../middleware/auth')


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
// Using async/await
// Add the async keyword
router.post('/signup', async (req, res, next) => {
    // wrap it in a try/catch to handle errors
    try {
      // store the results of any asynchronous calls in variables
      // and use the await keyword before them
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
         displayname: req.body.displayname,
        email: req.body.email, 
        password 
    });
      return res.status(201).json(user);
    } catch (error) {
      // return the next callback and pass it the error from catch
      return next(error);
    }
  });
/*** ALTERNATIVE ***/

//Using promise chain
// router.post('/signup', (req, res, next) => {
//     bcrypt
//       .hash(req.body.password, 10)
//       // return a new object with the email and hashed password
//       .then(hash =>
//         // when returning an object with fat arrow syntax, we
//         // need to wrap the object in parentheses so JS doesn't
//         // read the object curly braces as the function block
// //         ({
//              displayname: req.body.displayname,
//           email: req.body.email,
//           password: hash
//         })
//       )
//       // create user with provided email and hashed password
//       .then(user => User.create(user))
//       // send the new user object back with status 201, but `hashedPassword`
//       // won't be sent because of the `transform` in the User model
//       .then(user => res.status(201).json(user))
//       // pass any errors along to the error handler
//       .catch(next);
//   });


// LOGIN
// POST login 
// /users/login
// then redirect to /lists
router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
    // Pass the user and the request to createUserToken
    .then((user) => createUserToken(req, user))
    // createUserToken will either throw an error that
    // will be caught by our error handler or send back
    // a token that we'll in turn send to the client.
    .then((token) => res.json({ token }))
    .catch(next);
});



module.exports = router;
