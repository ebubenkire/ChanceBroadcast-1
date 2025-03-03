const mongoose = require('mongoose');

const AcademySchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  duration: {
    type: Number, // in weeks
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  maxStudents: {
    type: Number,
    required: true
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  syllabus: [{
    week: Number,
    topic: String,
    description: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Academy', AcademySchema); 