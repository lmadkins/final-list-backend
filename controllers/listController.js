const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const User = require('../models/User');
const Item = require('../models/Item');
const List = require('../models/List');

// All routes listed here start with '/lists'
// as defined in app.js


// GET (index)
// /lists/all
// Show all of a user's lists
router.get('/',  async (req, res, next) => {
    try {
        const lists = await List.find({})
        // .populate('timestamps')
        res.status(200).json(lists)
    } catch(err) {
        next(err)
    }
});

// 630ae5c1b5cdf6f6074d3e7e

// GET (show)
// /lists/items/:id
// (:id = list id)
// Show a specific list

// router.get('items/:id', requireToken, (req, res, next) => {
// router.get('items/:id',(req, res, next) => {
// 	List.findById(req.params.listId).populate('name', 'description', 'timestamp')
// 		.then((list) => res.json(list))
// 		.catch(next);
// });


// POST (create)
// /lists/new
// Create a new list
router.post('/new', (req, res, next) => {
	const listData = req.body;
	List.create(listData)
	// .populate('creator')

		.then((list) => res.status(201).json(list))
		.catch(next);
});



// PATCH (update)
// /lists/:id
// Edit a list's info
// router.patch('/:id', requireToken, async(req, res, next) => {
router.patch('/:id', async(req, res, next) => {

	List.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((list) => res.status(200).json(list))
		.catch(next);
});


// DELETE (destroy)
//  /lists/:id
// Delete a list
// router.delete('/:id', requireToken, (req, res, next) 
router.delete('/:id', (req, res, next) => {
    List.findByIdAndDelete(req.params.id)
    .then(
        (list) => 
        res.status(204).json(list)) 
    .catch(next)
});


module.exports = router;