const Vote = require('../models/Vote');
const { validationResult } = require('express-validator');

exports.createVoting = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newVoting = new Vote({
      ...req.body,
      contestant: req.body.contestantId
    });

    const voting = await newVoting.save();
    res.json(voting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getActiveVotings = async (req, res) => {
  try {
    const votings = await Vote.find({ isActive: true })
      .populate('contestant', 'name')
      .populate('votes.voter', 'name');
    res.json(votings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.submitVote = async (req, res) => {
  try {
    const voting = await Vote.findById(req.params.id);

    if (!voting) {
      return res.status(404).json({ msg: 'Voting not found' });
    }

    if (!voting.isActive) {
      return res.status(400).json({ msg: 'Voting is closed' });
    }

    // Check if user already voted
    const existingVote = voting.votes.find(
      vote => vote.voter.toString() === req.user.id
    );

    if (existingVote) {
      return res.status(400).json({ msg: 'Already voted for this contestant' });
    }

    voting.votes.push({ voter: req.user.id });
    voting.totalVotes += 1;
    await voting.save();

    res.json(voting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getVotingResults = async (req, res) => {
  try {
    const voting = await Vote.findById(req.params.id)
      .populate('contestant', 'name')
      .populate('votes.voter', 'name');

    if (!voting) {
      return res.status(404).json({ msg: 'Voting not found' });
    }

    res.json({
      contestant: voting.contestant,
      totalVotes: voting.totalVotes,
      isActive: voting.isActive
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; 