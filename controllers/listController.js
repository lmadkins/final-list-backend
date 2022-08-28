const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const User = require('../models/User');
const Item = require('../models/Item');
const List = require('../models/List');

// All routes listed here start with '/lists'
// as defined in app.js


// GET (index)
// /lists
// Show all of a user's lists
router.get('/', requireToken,  async (req, res, next) => {
    try {
        const lists = await List.find({})
        // .populate('timestamps')
        res.status(200).json(lists)
    } catch(err) {
        next(err)
    }
});


// GET (index)
// /lists/:type
// Show all a user's lists matching a type (item or task)


// 630ae5c1b5cdf6f6074d3e7e

// GET (show)
// /lists/:id
// Show a specific list
// router.get('/:id', requireToken, async(req, res, next) => {
//     try {
//         const list = await List.findById(req.params.id)
//         // .populate('timestamps')
//         res.status(200).json(list)
//     } catch(err) {
//         next(err)
//     }
// });
// HAVING ISSUES
// getting null
router.get('/:id', (req, res, next) => {
	List.findById(req.params.id).populate('list')
		.then((list) => res.json(list))
		.catch(next);
});



// 630adb49be010ae7a424a873
// lma@g acct

// POST (create)
// /lists/new
// Create a new list
// (Then will redirect w/ GET to /lists/:id)
// router.post('/', async (req, res, next) => {
//     try {
//         const newList = await List.create(req.body)
//         res.status(201).json(newList)
//     } catch(err) {
//         next(err)
//     }
// });
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
// (Then will redirect w/ GET to /lists/:id)
router.patch('/:id', requireToken, async(req, res, next) => {

	List.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((list) => res.status(200).json(list))
		.catch(next);
});


// DELETE (destroy)
//  /lists/:id
// Delete a list, then will redirect w/ GET to all lists- /lists
router.delete('/:id', requireToken, (req, res, next) => {
    List.findByIdAndDelete(req.params.id)
    .then(
        (list) => 
        res.status(204).json(list)) 
    .catch(next)
});


module.exports = router;