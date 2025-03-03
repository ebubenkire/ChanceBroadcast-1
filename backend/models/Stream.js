const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  streamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  streamUrl: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  category: {
    type: String,
    enum: ['live-performance', 'rehearsal', 'behind-scenes', 'competition', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'live', 'ended'],
    default: 'scheduled'
  },
  scheduledFor: {
    type: Date
  },
  viewers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  chat: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    message: String,
    sentAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stream', StreamSchema); 