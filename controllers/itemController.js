const express = require('express');
const router = express.Router();
const { requireToken } = require('../middleware/auth');
const User = require('../models/User');
const List = require('../models/List');
const Item = require('../models/Item');

// All routes listed here start with '/lists/items'
// as defined in app.js


// GET (index)
// /lists/items/:listId/
// Show all items of a list. Same as GET show in ListController
// '/:listId', requireToken,  (req, res, next) => {
// router.get('/:listId', (req, res, next) => {
//     List.findById(req.params.listId)
//     .populate('name')
//     .populate('details')
//     .populate('taskList')
//     .populate('itemList')
//     .populate('createdAt')
//     .select('items')
//     .then(items => res.json(items))
//     .catch(next)
// })
router.get('/:listId', async (req, res, next) => {
    try {
        const listItems = await List.findById(req.params.listId)
        listItems ? res.status(200).json(listItems) : res.sendStatus(404)
    }
    catch(err) {
        next(err)
    }
    // List.findById(req.params.listId)
    // .populate('name')
    // .populate('details')
    // .populate('taskList')
    // .populate('itemList')
    // .populate('createdAt')
    // .select('items')
    // .then(items => res.json(items))
    // .catch(next)
})


// GET (show)
// /lists/items/:listId/:id
// Show a specific item
// router.get('/:listId/:id', requireToken, (req, res, next) => {
router.get('/:listId/:id',  (req, res, next) => {
    List.findById(req.params.listId)
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

// router.post('/:listId', requireToken,  (req, res, next) => {

router.post('/:listId',  (req, res, next) => {
    const list = List.findById(req.params.listId)
    .then(list => {
        list.items.push(req.body)
        list.save()
        res.json(list.items)
    })
    .catch(next)
})

// PATCH (update)
//  /lists/items/:listId/:id
// Edit an item's info

requireToken
router.patch('/:listId/:id', async(req, res, next) => {
	List.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((list) => res.status(200).json(list))
		.catch(next);
});


// DELETE (destroy)
//  /lists/items/:id
// Delete an item, then will redirect w/ GET to all lists- /lists
// router.delete('/:id', requireToken, (req, res, next) => {
router.delete('/:listId/:itemId', (req, res, next) => {
    List.findById(req.params.listId)
    .then((list) => {
        if (list) {
            list.items.id(req.params.itemId).remove();
            list.save()
            res.status(204).json(list)
        } else {
            // if you can't find it, send a 404
            res.sendStatus(404)  
        }
    }) 
    .catch(next)
  });



module.exports = router;