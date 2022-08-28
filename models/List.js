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