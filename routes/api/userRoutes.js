const users = require('express').Router();
const {findUsers,createUser,findUser,updateUser,deleteUser,addFriend,removeFriend} = require('../../controllers/userController')

users.route('/')
    .get(findUsers)
    .post(createUser);

users.route('/:userId')
    .get(findUser)
    .put(updateUser)
    .delete(deleteUser);

users.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = users;