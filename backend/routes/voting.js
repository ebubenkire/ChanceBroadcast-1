const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const votingController = require('../controllers/votingController');

// @route   POST api/voting
// @desc    Create a new voting
router.post('/', [
  auth,
  [
    check('contestantId', 'Contestant ID is required').not().isEmpty(),
    check('competition', 'Competition name is required').not().isEmpty(),
    check('round', 'Round number is required').isNumeric(),
    check('startDate', 'Start date is required').not().isEmpty(),
    check('endDate', 'End date is required').not().isEmpty()
  ]
], votingController.createVoting);

// @route   GET api/voting/active
// @desc    Get all active votings
router.get('/active', votingController.getActiveVotings);

// @route   POST api/voting/:id/vote
// @desc    Submit a vote
router.post('/:id/vote', auth, votingController.submitVote);

// @route   GET api/voting/:id/results
// @desc    Get voting results
router.get('/:id/results', votingController.getVotingResults);

module.exports = router; 