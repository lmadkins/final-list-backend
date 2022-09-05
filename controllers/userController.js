const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { createUserToken, requireToken } = require('../middleware/auth')

// All routes listed here start with '/users'
// as defined in app.js

// SIGN IN 
// POST 
// /users/signin
router.post('/signin', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = createUserToken(req, user)
            res.json({token})
        }
        else {
            res.sendStatus(404)
        }
    } 
    catch(err) {
    next(err)
 }
})
//  	await User.findOne({ email: req.body.email })
// 		// Pass the user and the request to createUserToken
// 		.then((user) => createUserToken(req, user))
// 		// createUserToken will either throw an error that
// 		// will be caught by our error handler or send back
// 		// a token that we'll in turn send to the client.
// 		.then((token) => res.json({ token }))
// 		.catch(next);
// });

// SIGNUP
// POST 
// /users/signup
router.post('/signup'), (req, res, next) => {
    bcrypt
    .hash(req.body.password, 10)
    .then(hash => ({
        displayname: req.body.displayname,
        email: req.body.email, 
        password: hash,
    }))
    .then(user => User.create(user))
    .then (user => res.status(201).json(user))
    .catch(next)
}
// router.post('/signup', (req, res)=>{
//     console.log(req.body) 
//     const {displayname,email,password} =req.body;
//     User.findOne({email:email},(err,user)=>{
//         if(user){
//             res.send({message:"A user with that name already exists. Have you forgotten your password?"})
//         }else {
//             const user = new User({displayname,email,password})
//             user.save(err=>{
//                 if(err){
//                     res.send(err)
//                 }else{
//                     res.json(user)
//                     res.send({message:"Sucess!"})
//                 }
//             })
//         }
//     })
// }) 

// GET (index)
// show all users
// /users
router.get('/',  requireToken, async (req, res, next) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch(err) {
        next(err)
    }
})

// GET (show)
// show a specific user
// /users/:id
router.get('/:id', requireToken,  (req, res, next) => {
	// const id = req.params.id;
	User.findById(req.params.id)
		.then((user) => res.json(user))
		.catch(next);
});

// PATCH 
// update a user's info 
// /users/:id

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
router.delete('/:id', requireToken, async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json(deletedUser)
    } catch(err) {
        next(err)
    }
});

module.exports = router;
