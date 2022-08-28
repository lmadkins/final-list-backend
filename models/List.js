// add the parent document’s id to each of the child documents to create a one to many
// After the description property in the schema, add an owner field. Set its type to a Mongoose object id, reference the User model, and make it required:
// {
//     ...
//     owner: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//       }
//     }

const mongoose = require('../db/connection');
const itemSchema = require('./Item');
const taskSchema = require('./Task');
const User = require('./User');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    details: {
        type: String,
        required: true, 
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
    items: [itemSchema],
    tasks: [taskSchema],
    },
    { timestamps: true }
  );

  module.exports = listSchema;
//   const List  = mongoose.model('List', ListSchema);
// module.exports = List;