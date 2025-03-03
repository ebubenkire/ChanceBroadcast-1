const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  contestant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  competition: {
    type: String,
    required: true
  },
  round: {
    type: Number,
    required: true
  },
  votes: [{
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    votedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalVotes: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Vote', VoteSchema); 