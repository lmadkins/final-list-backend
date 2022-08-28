const mongoose = require('../db/connection');
const List = require('./List')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        default: 'New Item'
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
    },
    details: {
        type: String,
        // required: true, 
    },
    store: {
        type: String,
    },
    priority: {
        type: String,
        // required: true
        default: 'Low',
    },
    completed: {
        type: Boolean,
        required: true, 
        default: false,
    },
    },
    { timestamps: true }
);

module.exports = itemSchema;