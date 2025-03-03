const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: ['concert', 'competition', 'workshop', 'other']
  },
  price: {
    type: Number,
    default: 0
  },
  capacity: {
    type: Number,
    required: true
  },
  registeredUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

module.exports = mongoose.model('Event', EventSchema); 