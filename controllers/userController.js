const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createUserToken, requireToken } = require('../middleware/auth')

// All routes listed here start with '/users'
// as defined in app.js

// LOGIN
// POST login 
// /users/login
// then after this will go to /lists
// router.post('/login', async (req, res, next) => {
//     try {
//         await User.findOne({ email: req.body.email })
//         // Pass the user and the request to createUserToken
//         .then((user) => createUserToken(req, user))
//         // createUserToken will either throw an error that
//         // will be caught by our error handler or send back
//         // a token that we'll in turn send to the client.
//         .then((token) => res.json({ token }))
//     } catch(err) {
//         next(err)
//     }
// });

// router.post('/login', async (req, res, next)=>{
//     // grabs the id of the signed in user
//     let id = ''
//     await User.findOne({email: req.body.email})
//     .then(user => {
//         if (user) {
//             id = user._id
//         }
//     })
//     .catch(next)
//     // generates token for the signed in user, and sends back response with token and id
//     await User.findOne({email: req.body.email})
//     .then((user)=> createUserToken(req, user))
//     .then((token)=> res.json({token: token, id: id}))
//     // .catch(next)
// })
// app.post('login',(req,res)=>{
//     const {email, password} = req.body;
//     User.findOne({email: email},(err, user)=>{
//         if(user){
//         if(password === user.password){
//             res.send({message:"login sucess", user:user})
//         }else{
//             res.send({message:"wrong credentials"})
//         }
//         }else{
//             res.send("not register")
//         }
//     })
// });
router.post('/signin', (req, res, next) => {
	User.findOne({ email: req.body.email })
		// Pass the user and the request to createUserToken
		.then((user) => createUserToken(req, user))
		// createUserToken will either throw an error that
		// will be caught by our error handler or send back
		// a token that we'll in turn send to the client.
		.then((token) => res.json({ token }))
		.catch(next);
});

// SIGN UP
// POST create a new user 
// /users/signup
// then redirect to /lists
// Using async/await
// Add the async keyword
// router.post('/signup', async (req, res, next) => {
//     // wrap it in a try/catch to handle errors
//     try {
//       // store the results of any asynchronous calls in variables
//       // and use the await keyword before them
//         const password = await bcrypt.hash(req.body.password, 10);
//         const user = await User.create({
//             displayname: req.body.displayname,
//             email: req.body.email, 
//             password 
//     });
//         return res.status(201).json(user);
//     } catch(err) {
//         next(err)
//     }
// });
router.post('/signup',(req,res)=>{
    console.log(req.body) 
    const {displayname,email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({displayname,email,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"sucessful"})
                }
            })
        }
    })


}) 
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

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch(err) {
        next(err)
    }
})

// GET show a user's info 
// /users/:id
router.get('/:id', requireToken, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch(err) {
        next(err)
    }
});

// PATCH update a user's info 
// /users/:id
// then redirect to GET /users/:id
router.patch('/:id', requireToken, async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (updatedUser) {
            res.json(updatedUser)
        } else {
            res.sendStatus(404)
        }
    } catch(err) {
        next(err)
    }
});

// DELETE a user
// /users/:id
// then redirect to home, logged out
router.delete('/:id', requireToken, async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json(deletedUser)
    } catch(err) {
        next(err)
    }
});

module.exports = router;
