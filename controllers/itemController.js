const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const User = require('../models/User');
const List = require('../models/List');
const Item = require('../models/Item');

// All routes listed here start with '/lists/items'
// as defined in app.js


// GET (index)
// /lists/items/listId/
// Show all items of a list
// (same as) GET show in ListController
router.get('/:listId', requireToken,  (req, res, next) => {
    List.findById(req.params.listId)
    .populate('name')
    .populate('details')
    .populate('taskList')
    .populate('itemList')
    .populate('createdAt')
    .select('items')
    .then(items => res.json(items))
    .catch(next)
})

// GET (index)
// /lists/items/:priority
// Show all a list's items/tasks matching a certain priority type

// GET (index)
// /lists/items/:timeestimate
// Show all a list's tasks (only tasks, items dont have a time estimate) matching a certain time estimate


// GET (show)
// /lists/items/:listId/:id
// Show a specific item
router.get('/:listId/:id', requireToken, (req, res, next) => {
    List.findById(req.params.id)
        .then((list) => {
            if (list) {
                const foundItem = list.items.find(item => item._id.toString() === req.params.id)
    
            if (foundItem) {
                res.json(foundItem)
            } else {
                res.sendStatus(404)
            }
            } else {
              // if you can't find it, send a 404
            res.sendStatus(404)
            }
        })
        .catch(next)
})

// list id
// 630b7883962b9510af2f6aba
// POST (create)
// /lists/items/:listId
// Create a new item
// (Then will redirect w/ GET to /lists/:id)
router.post('/:listId', requireToken,  (req, res, next) => {
    const list = List.findById(req.params.listId)
    .then(list => {
        list.items.push(req.body)
        list.save()
        res.json(list.items)
    })
    .catch(next)
    console.log('Item created')
})

// PATCH (update)
// /lists/items/:listId/:id
// Edit an item's info
// (Then will redirect w/ GET to /lists/:id)
router.patch('/:listId/:id', requireToken, async(req, res, next) => {

	List.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((list) => res.status(200).json(list))
		.catch(next);
});


// DELETE (destroy)
//  /lists/:listId/:id
// Delete an item, then will redirect w/ GET to all lists- /lists
router.delete('/:listId/:id', requireToken, (req, res, next) => {
    List.findByIdAndDelete(req.params.id)
     .then(
        (list) => 
        res.status(204).json(list)) 
     .catch(next)
  });


module.exports = router;