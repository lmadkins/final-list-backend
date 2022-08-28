const mongoose = require('../db/connection');
const ListSchema = require('./List')

const UserSchema = new mongoose.Schema(
    {
        displayname: {
            type: String,
        },
        email: {
          type: String,
          required: true,
          // unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        // lists: [listSchema]
      },
      {
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