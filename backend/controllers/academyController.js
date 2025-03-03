const Academy = require('../models/Academy');
const { validationResult } = require('express-validator');

exports.createCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newCourse = new Academy({
      ...req.body,
      instructor: req.user.id
    });

    const course = await newCourse.save();
    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Academy.find()
      .sort({ startDate: 1 })
      .populate('instructor', 'name')
      .populate('enrolledStudents', 'name');
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Academy.findById(req.params.id)
      .populate('instructor', 'name')
      .populate('enrolledStudents', 'name');

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const course = await Academy.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    // Check if user already enrolled
    if (course.enrolledStudents.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already enrolled in this course' });
    }

    // Check capacity
    if (course.enrolledStudents.length >= course.maxStudents) {
      return res.status(400).json({ msg: 'Course is full' });
    }

    course.enrolledStudents.push(req.user.id);
    await course.save();

    res.json(course);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; 