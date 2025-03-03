const mongoose = require('mongoose');

const AuditionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['singing', 'dancing', 'acting', 'modeling', 'other']
  },
  requirements: [{
    type: String
  }],
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'in-review'],
    default: 'open'
  },
  applications: [{
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    videoUrl: String,
    notes: String,
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Audition', AuditionSchema); 