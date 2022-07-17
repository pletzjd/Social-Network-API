const { Schema, model, Types } = require('mongoose');
const moment = require('moment');


// Schema to create reaction model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 280,
    },
    username:[{
        type: String,
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => moment(date).format('MMMM Do YYYY, h:mm a')
      },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);


const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;