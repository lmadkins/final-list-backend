const mongoose = require('../db/connection');
const List = require('./List')
const User = require('./User')

const ItemSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: true,
        minLength: [1, 'Can you expand on that?'],
        maxLength: 50,
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
        maxLength: 100,
        // required: true, 
    },
    where: {
        type: String,
        minLength: [1, 'Can you expand on that?'],
        maxLength: 30,
        lowercase: true,
        // (convert it to lowercase for storage/search consistency purposes)
    },
    priority: {
        type: String,
        // enum: ['Low', 'Medium', 'High', 'Highest'],
        required: true,
        default: 'Low',
        minLength: 3,
        maxLength: 7,
        lowercase: true,
        // (convert it to lowercase for storage/search consistency purposes)
    },
    completed: {
        type: Boolean,
        // required: true,
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

module.exports = ItemSchema;