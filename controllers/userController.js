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

// SIGNUP
// POST 
// /users/signup
router.post('/signup', (req, res)=>{
    console.log(req.body) 
    const {displayname,email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"A user with that name alraedy exists. Have you forgotten your password?"})
        }else {
            const user = new User({displayname,email,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"Sucess@"})
                }
            })
        }
    })


}) 

// GET (index)
// show all users
// /users
router.get('/', async (req, res, next) => {
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
router.get('/:id', requireToken, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch(err) {
        next(err)
    }
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
