const mongoose = require('../db/connection');
const List = require('./List')
const User = require('./User')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'What\'s the item name?'],
        minLength: [1, 'Can you expand on that?'],
        maxLength: 25,
        default: 'New Item'
         // (convert it to lowercase for storage/search consistency purposes)
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
    },
    details: {
        type: String,
        minLength: [1, 'Can you expand on that?'],
        maxLength: 50,
        // required: true, 
    },
    store: {
        type: String,
        minLength: [1, 'Can you expand on that?'],
        maxLength: 30,
        lowercase: true,
        // (convert it to lowercase for storage/search consistency purposes)
    },
    priority: {
        type: String,
        // enum: ['Low', 'Medium', 'High', 'Highest'],
        required: [true, 'What priority level is it?'],
        default: 'Low',
        minLength: 3,
        maxLength: 7,
        lowercase: true,
        // (convert it to lowercase for storage/search consistency purposes)
    },
    completed: {
        type: Boolean,
        required: [true, 'Is it done yet?'],
        default: false,
        // minLength: 4,
        // maxLength: 5,
        lowercase: true,
        // (convert it to lowercase for storage/search consistency purposes)
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    },
    { 
        // collection: 'items',
        timestamps: true }
);

module.exports = itemSchema;