const mongoose = require('../db/connection');
const ItemSchema = require('./Item');
const TaskSchema = require('./Task');
const User = require('./User');

const ListSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        // required: true, 
    },
    details: {
        type: String,
        // required: true, 
    },
    taskList: { 
        type: Boolean, 
        // required: true,
        default: false,
    }, 
    itemList: { 
        type: Boolean, 
        // required: true, 
        default: true,
    }, 
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true, 
    }, 
    items: [ItemSchema],
    tasks: [TaskSchema], 
        // collection: 'lists',
    },
    {
        timestamps: true, 
    }

);

//   module.exports = listSchema;
const List  = mongoose.model('List', ListSchema);
module.exports = List;