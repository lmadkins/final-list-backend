const mongoose = require('../db/connection');
const ListSchema = require('./List')
const ItemSchema = require('./Item')

const UserSchema = new mongoose.Schema(
    {
        id: Number,
        displayname: {
            type: String,
            // lowercase: true,
           // (convert it to lowercase for storage/search consistency purposes)
        },
        email: {
          type: String,
          // required: true,
          lowercase: true,
          // (convert it to lowercase for storage/search consistency purposes)
          // unique: true,
        },
        password: {
          type: String,
          // required: true,
        },
        // lists: [ListSchema],
        // items:[ItemSchema]
      },
      {
    // collection: 'users',
		timestamps: true,
		toJSON: {
			virtuals: true,
			// ret is the returned Mongoose document
			transform: (_doc, ret) => {
				delete ret.password;
				return ret;
			},
		},
	}
)

const User  = mongoose.model('User', UserSchema);
module.exports = User;