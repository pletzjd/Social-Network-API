const thoughts = require('express').Router();
const {findThoughts,createThought,findThought,updateThought,deleteThought,createReaction,removeReaction} = require('../../controllers/thoughtController')

thoughts.route('/')
    .get(findThoughts)
    .post(createThought);

thoughts.route('/:thoughtId')
    .get(findThought)
    .put(updateThought)
    .delete(deleteThought);

thoughts.route('/:thoughtId/reactions').post(createReaction);

thoughts.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = thoughts;