const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const User = require('../models/User');
const List = require('../models/List');
const Item = require('../models/Item');

// All routes listed here start with '/lists/items'
// as defined in app.js


// GET (index)
// /lists/items
// Show all items of a list

router.get('/:listId', requireToken, async (req, res, next) => {

    try {
      // find the list first
        const list = await List.findById(
        req.params.id
        )
        if (list) {
        // if task list is true or if item list is true
        // respond with all of the items for that list
        res.status(200).json(list.items)
        //  or res.json(list.items)
        } else {
        // if you can't find it, send a 404
        res.sendStatus(404)
    }
    } catch(err) {
        next(err)
    }
});


// GET (index)
// /lists/items/:priority
// Show all a list's items/tasks matching a certain priority type

// GET (index)
// /lists/items/:timeestimate
// Show all a list's tasks (only tasks, items dont have a time estimate) matching a certain time estimate


// GET (show)
// /lists/items/:id
// Show a specific item
router.get('/:listId/:id', requireToken, async(req, res, next) => {
    try {
        const item = await Item.findById(req.params.id)
        // .populate('timestamps')
        res.status(200).json(item)
    } catch(err) {
        next(err)
    }
})


// POST (create)
// /lists/items/new
// Create a new item
// (Then will redirect w/ GET to /lists/:id)
router.post('/:listId', requireToken, async (req, res, next) => {
    try {
        const newItem = await Item.create(req.body)
        res.status(201).json(newItem)
    } catch(err) {
        next(err)
    }
})


// PATCH (update)
// /lists/items/:id
// Edit an item's info
// (Then will redirect w/ GET to /lists/:id)
router.patch('/:listId/:id', requireToken, async(req, res, next) => {

	List.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((list) => res.status(200).json(list))
		.catch(next);
});


// DELETE (destroy)
//  /lists/:id
// Delete a list, then will redirect w/ GET to all lists- /lists
router.delete('/:listId/:id', requireToken, (req, res, next) => {
    List.findByIdAndDelete(req.params.id)
     .then(
        (list) => 
        res.status(204).json(list)) 
     .catch(next)
  });


module.exports = router;