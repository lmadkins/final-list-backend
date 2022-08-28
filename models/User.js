const mongoose = require('../db/connection');

const userSchema = new mongoose.Schema(
    {
        displayname: {
            type: String,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
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

const User  = mongoose.model('User', userSchema);
module.exports = User;