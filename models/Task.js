const mongoose = require('../db/connection');
const List = require('./List')

const TaskSchema = new mongoose.Schema({
    id: Number,
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
    timeEstimate: {
        type: String,
        // required: true
        default: '',
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
    { timestamps: true, }
);

module.exports = TaskSchema;


