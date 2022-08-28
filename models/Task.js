const mongoose = require('../db/connection');
const List = require('./List')

const taskSchema = new mongoose.Schema({
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
    timeestimate: {
        type: String,
        // required: true
        default: '',
    },
    completed: {
        type: Boolean,
        required: true, 
        default: false,
    },
    },
    { timestamps: true }
);

module.exports = taskSchema;


