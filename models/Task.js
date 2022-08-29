const mongoose = require('../db/connection');
const List = require('./List')

const TaskSchema = new mongoose.Schema({
    id: Number,
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
    // creator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    },
    { timestamps: true }
);

module.exports = TaskSchema;


