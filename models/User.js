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
      }
    );
    
)

const User  = mongoose.model('User', userSchema);
module.exports = User;