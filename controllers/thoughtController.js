const { User, Thought } = require("../models");

module.exports = {
	async findThoughts(req, res) {
		try {
			const thoughts = await Thought.find().select("-__v");

			if (!thoughts.length) {
				return res.status(404).json({message: "No thoughts found"});
			};

			return res.status(200).json(thoughts);
		} catch (err) {
			return res.status(500).json(err);
		}
	},

    async createThought(req, res) {
		try {
			const user = await User.findOne({username: req.body.username});

			if (!user) {
				return res.status(404).json({message: `No user with username ${req.body.username} found`});
			};

			const newThought = await Thought.create(req.body);

			if (!newThought) {
				return res.status(404).json({message: "Failed to create thought"});
			};

			await User.findOneAndUpdate(
				{username: req.body.username},
				{$push: {thoughts: newThought._id}},
				{runValidators: true, new: true}
			);

			return res.status(200).json(newThought);
		} catch (err) {
			return res.status(500).json(err);
		}
	},

	async findThought(req, res) {
		try {
			const thought = await Thought.findOne({
				_id: req.params.thoughtId,
			}).select("-__v");

			if (!thought) {
				return res.status(404).json({message: `No thought with id ${req.params.thoughtId} found`});
			};

			return res.status(200).json(thought);
		} catch (err) {
			return res.status(500).json(err);
		}
	},

	async updateThought(req, res) {
		try {
			const updateThought = await Thought.findOneAndUpdate(
				{_id: req.params.thoughtId},
				{$set: req.body},
				{runValidators: true, new: true}
			);

			if (!updateThought) {
				return res.status(404).json({message: `No thought with id ${req.params.thoughtId} found`});
			};

			return res.status(200).json(updateThought);
		} catch (err) {
			return res.status(500).json(err);
		}
	},

	async deleteThought(req, res) {
		try {
			const deleteThought = await Thought.findOneAndDelete({
				_id: req.params.thoughtId,
			});

			if (!deleteThought) {
				return res.status(404).json({message: `No thought with id ${req.params.thoughtId} found`});
			};

			return res.status(200).json(deleteThought);
		} catch (err) {
			return res.status(500).json(err);
		}
	},

	async createReaction(req, res) {
		try {
			const updateThought = await Thought.findOneAndUpdate(
				{_id: req.params.thoughtId},
				{$push: {reactions: req.body}},
				{runValidators: true, new: true}
			);

			if (!updateThought) {
				return res.status(404).json({message: "Failed to add reaction"});
			};

			return res.status(200).json(updateThought);
		} catch (err) {
			return res.status(500).json(err);
		}
	},

	async removeReaction(req, res) {
		try {
			const updateThought = await Thought.findOneAndUpdate(
				{_id: req.params.thoughtId},
				{$pull: {reactions: {reactionId: req.params.reactionId}}},
				{runValidators: true, new: true}
			);

			if (!updateThought) {
				return res.status(404).json({message: "Failed to remove reaction"});
			}

			return res.status(200).json(updateThought);
		} catch (err) {
			return res.status(500).json(err);
		}
	},
};