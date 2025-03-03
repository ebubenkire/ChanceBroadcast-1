const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const academyController = require('../controllers/academyController');

// @route   POST api/academy
// @desc    Create a new course
router.post('/', [
  auth,
  [
    check('courseName', 'Course name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('level', 'Level is required').isIn(['beginner', 'intermediate', 'advanced']),
    check('duration', 'Duration is required').isNumeric(),
    check('price', 'Price is required').isNumeric(),
    check('startDate', 'Start date is required').not().isEmpty(),
    check('maxStudents', 'Maximum number of students is required').isNumeric()
  ]
], academyController.createCourse);

// @route   GET api/academy
// @desc    Get all courses
router.get('/', academyController.getCourses);

// @route   GET api/academy/:id
// @desc    Get course by ID
router.get('/:id', academyController.getCourse);

// @route   POST api/academy/:id/enroll
// @desc    Enroll in a course
router.post('/:id/enroll', auth, academyController.enrollCourse);

module.exports = router; 