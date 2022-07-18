const { User, Thought } = require('../models');

module.exports = {

    async findUsers(req, res) {
      try {
        const users = await User.find({})
  
        if (!users) {
          return res.status(404).json({message: 'No users found'});
        };
  
        return res.status(200).json(users);
      } catch (err) {
        return res.status(500).json(err);
      }
    },

    async createUser(req, res) {
        try {
          const newUser = await User.create(req.body);
    
          if (!newUser) {
            return res.status(404).json({message: 'failed to create user'});
          };
    
          return res.status(200).json(newUser);
        } catch (err) {
          return res.status(500).json(err);
        }
      },    

    async findUser(req, res) {
      try {
        const user = await User.findOne({_id: req.params.userId})
          .select('-__v')
          .populate('thoughts')
          .populate('friends');
  
        if (!user) {
          return res.status(404).json({message: `No user with id ${req.params.userId} found`});
        };
  
        return res.status(200).json(user);
      } catch (err) {
        return res.status(500).json(err);
      }
    },
  
    async updateUser(req, res) {
      try {
        const updateUser = await User.findOneAndUpdate(
          {_id: req.params.userId},
          {$set: req.body},
          {runValidators: true, new: true}
        );
  
        if (!updateUser) {
          return res.status(404).json({message: `No user with id ${req.params.userId} found`});
        };
  
        return res.status(200).json(updateUser);
      } catch (err) {
        return res.status(500).json(err);
      }
    },
  
    async deleteUser(req, res) {
      try {
        const deleteUser = await User.findOneAndDelete({_id: req.params.userId});
  
        if (!deleteUser) {
          return res.status(404).json({message: `No user with id ${req.params.id} found`});
        };
  
        await Thought.deleteMany({_id: {$in: deleteUser.thoughts}});
  
        return res.status(200).json(deleteUser);
      } catch (err) {
        return res.status(500).json(err);
      }
    },
  
    async addFriend(req, res) {
      try {
        const updateUser = await User.findOneAndUpdate(
          {_id: req.params.userId},
          {$push: { friends: req.params.friendId}},
          {runValidators: true, new: true}
        );
  
        if (!updateUser) {
          return res.status(404).json({message: 'Failed to add friend'});
        };
  
        return res.status(200).json(updateUser);
      } catch (err) {
        return res.status(500).json(err);
      }
    },
  
    async removeFriend(req, res) {
      try {
        const updateUser = await User.findOneAndUpdate(
          {_id: req.params.userId},
          {$pull: { friends: req.params.friendId}},
          {runValidators: true, new: true}
        );
  
        if (!updateUser) {
          return res.status(404).json({message: 'Failed to remove friend'});
        };
  
        return res.status(200).json(updateUser);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  };