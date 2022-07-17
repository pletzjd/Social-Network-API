const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');


// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => moment(date).format('MMMM Do YYYY, h:mm a')
    },
    username:{
        type: String,
        required: true
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// Virtual to count number of friends
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;