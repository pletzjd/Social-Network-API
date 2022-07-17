const thoughts = require('express').Router();
const {findThoughts,createThought,findthought,updateThought,deleteThought,createReaction,removeReaction} = require('../../controllers/thoughtController')

thoughts.route('/')
    .get(findThoughts)
    .post(createThought);

thoughts.route('/:thoughtId')
    .get(findthought)
    .put(updateThought)
    .delete(deleteThought);

thoughts.route('/:thoughtId/reactions').post(createReaction);

thoughts.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = thoughts;