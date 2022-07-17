const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate:[
        isEmail,
        'Invalid Email',
      ]
    },
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual to count number of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;